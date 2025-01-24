#!/bin/bash
# NOT YET READY SCRIPT DO NOT USE
PROGNAME="init_single_network.sh"
PGPASSFILE=".db.env"
PGPASS=
SMTPEMAIL=
SMTPPASS=
RESET_PASSWORD_TOKEN_SECRET=
VERIFICATION_TOKEN_SECRET=

generate_pgpass () {
    while [[ -z "$PGPASS" ]]; do
      read -p "Enter a password for PostgreSQL Cluster -> " PGPASS
      if [ -n "$PGPASS" ]; then
            echo "$PGPASS" > $PGPASSFILE
            break
      else
            echo -e "\e[31m\nError: Password must not be empty\e[0m" >&2
      fi
    done
}

smtp_email () {
    while [[ -z "$SMTPEMAIL" ]]; do
        read -p "Enter your email for SMTP server 'account@gmail.com' -> " SMTPEMAIL
        if [ -n "$SMTPEMAIL" ]; then
            break
        else
            echo -e "\e[31m\nError: Email must not be empty\e[0m" >&2
        fi
    done
}

smtp_pass () {
    while [[ -z "$SMTPPASS" ]]; do
        read -p "Enter your password for SMTP server 'qwerty123456' -> " SMTPPASS
        if [ -n "$SMTPPASS" ]; then
            break
        else
            echo -e "\e[31m\nError: SMTP password must not be empty\e[0m" >&2
        fi
    done
}

enter_token () {
    local token_name=$1
    local token_value=""
    while [[ -z "$token_value" ]]; do
        read -p "Enter your $token_name -> " token_value
        if [ -n "$token_value" ]; then
            echo -e "\e[32m\n$token_name set.\e[0m"
            break
        else
            echo -e "\e[31m\nError: $token_name must not be empty\e[0m" >&2
        fi
    done
    echo "$token_value"
}

generate_token () {
    python3 -c 'import secrets; print(secrets.token_hex())'
}

usage () {
    echo "$PROGNAME: usage: $PROGNAME [-i | --pgpass <password> --smtppass <password> --smtpemail <email> --reset-token <token> --verif-token <token>]"
    exit 1
}

interactive=false
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        -i|--interactive) interactive=true ;;
        --pgpass) PGPASS="$2"; shift ;;
        --smtppass) SMTPPASS="$2"; shift ;;
        --smtpemail) SMTPEMAIL="$2"; shift ;;
        --reset-token) RESET_PASSWORD_TOKEN_SECRET="$2"; shift ;;
        --verif-token) VERIFICATION_TOKEN_SECRET="$2"; shift ;;
        -h|--help) usage ;;
        *) echo "Unknown parameter: $1"; usage ;;
    esac
    shift
done


if $interactive; then
    echo "Interactive mode enabled."
    if [ -e "$PGPASSFILE" ] && [ -s "$PGPASSFILE" ]; then
        echo -e "\e[32mFile with PostgreSQL password exists and is not empty.\e[0m"
        read -p "Create new password (yes) or keep present (no)? > " ANSWER
        case "$ANSWER" in
            Y|y|yes) generate_pgpass ;;
            N|n|no) echo -e "\nSkipping password creation..." ;;
        esac
    else
        echo -e "\e[33mNo $PGPASSFILE found! Creating one...\e[0m"
        generate_pgpass
    fi
    smtp_email
    smtp_pass
    echo "Reset Password Token Secret"
    read -p "Generate random token (r) or enter a token (i) -> " RESET_ANSWER
    case "$RESET_ANSWER" in
        r|R) RESET_PASSWORD_TOKEN_SECRET=$(generate_token) ;;
        i|I) RESET_PASSWORD_TOKEN_SECRET=$(enter_token "Reset Password Token Secret") ;;
    esac
    echo "Verification Token Secret"
    read -p "Generate random token (r) or enter a token (i) -> " VERIF_ANSWER
    case "$VERIF_ANSWER" in
        r|R) VERIFICATION_TOKEN_SECRET=$(generate_token) ;;
        i|I) VERIFICATION_TOKEN_SECRET=$(enter_token "Verification Token Secret") ;;
    esac
else

    if [[ -z "$PGPASS" || -z "$SMTPEMAIL" || -z "$SMTPPASS" || \
    -z "$RESET_PASSWORD_TOKEN_SECRET" || -z "$VERIFICATION_TOKEN_SECRET" ]]; then
        echo -e "\e[31m\nError: All parameters must be provided in non-interactive mode.\e[0m"
        usage
    fi
    echo -e "\e[32mNon-interactive mode enabled. Using provided arguments.\e[0m"
fi

#apply_changes () {
#  sed -i "s|APP_CONFIG__DB__URL: .*|APP_CONFIG__DB__URL: postgresql+asyncpg://main:${PGPASS}@pg:5432/shop|" \
#  docker-compose.single-network.yml
#  echo -e "\e[32m\nNew password has been set to $PGPASSFILE\e[0m"
#
#  sed -i "s|GOOGLE__CREDENTIALS__EMAIL: .*|GOOGLE__CREDENTIALS__EMAIL: ${SMTPEMAIL}|" docker-compose.single-network.yml
#  echo -e "\e[32m\nEmail set.\e[0m"
#
#  sed -i "s|GOOGLE__CREDENTIALS__PASSWORD: .*|GOOGLE__CREDENTIALS__PASSWORD: ${SMTPPASS}|" docker-compose.single-network.yml
#  echo -e "\e[32m\nSMTP password set.\e[0m"
#
#  sed -i "s|APP_CONFIG__ACCESS_TOKEN__RESET_PASSWORD_TOKEN_SECRET: .*|APP_CONFIG__ACCESS_TOKEN__RESET_PASSWORD_TOKEN_SECRET: ${RESET_PASSWORD_TOKEN_SECRET}|" docker-compose.single-network.yml
#  echo -e "\e[32m\nReset password token secret set.\e[0m"
#
#  sed -i "s|APP_CONFIG__ACCESS_TOKEN__VERIFICATION_TOKEN_SECRET: .*|APP_CONFIG__ACCESS_TOKEN__VERIFICATION_TOKEN_SECRET: ${VERIFICATION_TOKEN_SECRET}|" docker-compose.single-network.yml
#  echo -e "\e[32m\nVerification token secret set.\e[0m"
#}

APP_CONFIG_DB_ECHO=$(grep -E "APP_CONFIG__DB__ECHO:" docker-compose.single-network.yml | awk '{print $2}')
APP_CONFIG_RELOAD=$(grep -E "APP_CONFIG__RELOAD__RELOAD:" docker-compose.single-network.yml | awk '{print $2}')

if [[ "$APP_CONFIG_DB_ECHO" == "1" ]]; then
    echo -e "\n\e[33mWarning: APP_CONFIG_DB_ECHO is set to 1. \
    Redundant SQLAclhemy logging is on.\e[0m" >&2
    echo -e "\e[33mWarning: This may impact performance. \
    Use only for testing\development  purposes!\e[0m" >&2
fi
if [[ "$APP_CONFIG_RELOAD" == "1" ]]; then
    echo -e "\n\e[33mWarning: APP_CONFIG__RELOAD__RELOAD is set to 1. \
    FastAPI will restart if the code changes!.\e[0m" >&2
    echo -e "\e[33mWarning: This may impact performance. \
    Use only for testing\development purposes!\e[0m" >&2
fi

echo -e "\n"
echo "PostgreSQL Password: $PGPASS"
echo "SMTP Email: $SMTPEMAIL"
echo "SMTP Password: $SMTPPASS"
echo "Reset Password Token Secret: $RESET_PASSWORD_TOKEN_SECRET"
echo "Verification Token Secret: $VERIFICATION_TOKEN_SECRET"



