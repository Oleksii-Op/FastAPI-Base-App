#!/bin/bash

PGPASSFILE=".db.env"
APP_CONFIG_DB_ECHO=$(grep -E "APP_CONFIG__DB__ECHO:" docker-compose.yml | awk '{print $2}')

if [ -e "$PGPASSFILE" ] && [ -s "$PGPASSFILE" ]; then
    echo "File with PostgreSQL password exists"
    read -p "Create new password(yes) or keep present(no)? > " ANSWER
    if [ "$ANSWER" == "yes" ]; then
        read -p "Enter a password for PostgreSQL -> " PGPASS
        if [ -n "$PGPASS" ]; then
            echo -e "\nNew password has been set to $PGPASSFILE"
            echo "$PGPASS" > $PGPASSFILE
            sed -i "s|APP_CONFIG__DB__URL: .*|APP_CONFIG__DB__URL: postgresql+asyncpg://main:${PGPASS}@pg:5432/shop|" docker-compose.yml
        else
            echo -e "\e[31m\nError\e[0m" >&2
            echo -e "\e[31m\nPassword must not be empty\e[0m" >&2
            exit 1
        fi
    else
        echo -e "\nSkipping..."
    fi
else
    echo "Supersecret" > $PGPASSFILE
fi

read -p "Enter your third app Gmail for SMTP server 'account@gmail.com' -> " SMTPEMAIL
read -sp "Enter your third app PASSWORD for SMTP server -> " SMTPPASS
if [ -n "$SMTPEMAIL" ] && [ -n "$SMTPPASS" ]; then
    echo -e "\n\nSetting Email in docker-compose file."
    sed -i "s|GOOGLE__CREDENTIALS__EMAIL: .*|GOOGLE__CREDENTIALS__EMAIL: ${SMTPEMAIL}|" docker-compose.yml
    echo "Setting password in docker-compose file."
    sed -i "s|GOOGLE__CREDENTIALS__PASSWORD: .*|GOOGLE__CREDENTIALS__PASSWORD: ${SMTPPASS}|" docker-compose.yml
else
    echo -e "\e[31m\n\nError\e[0m" >&2
    echo -e "\e[31mEmpty value(values)\e[0m" >&2
    exit 1
fi


if [[ "$APP_CONFIG_DB_ECHO" == "1" ]]; then
    echo -e "\e[33mWarning: APP_CONFIG_DB_ECHO is set to 1. Redundant SQLAclhemy logging is on.\e[0m" >&2
    echo -e "\e[33mWarning: This may impact performance. Use only for testing purposes!\e[0m" >&2
fi

echo -e "\e[32m\nSetting up is complete.\e[0m"
echo -e "\e[32m\nRun 'docker compose up -d --build' to start the project.\e[0m"