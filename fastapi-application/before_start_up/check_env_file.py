import logging
import pathlib


logger = logging.getLogger(__name__)


class NoEnvironmentFileFound(Exception):
    pass


def find_env(env_name: str = ".env") -> None:

    config_path = pathlib.Path.cwd() / env_name
    logger.info("Checking path(%r)", config_path.as_posix())
    if config_path.exists():
        logger.info(
            "Found .env file path(%r)",
            config_path.as_posix(),
        )
        return

    file_path = pathlib.Path(__file__).resolve()
    parent_path = file_path.parent.parent
    config_path = parent_path / env_name
    logger.info(
        "Checking path(%r)",
        config_path.as_posix(),
    )
    if config_path.exists():
        logger.info(
            "Found .env file path(%r)",
            config_path.as_posix(),
        )
        return

    config_path = pathlib.Path.home() / env_name
    logger.info(
        "Checking path(%r)",
        config_path.as_posix(),
    )
    if config_path.exists():
        logger.info(
            "Found .env file path(%r)",
            config_path.as_posix(),
        )
        return

    logger.error("Start-Up fail. No .env file found")
    raise NoEnvironmentFileFound
