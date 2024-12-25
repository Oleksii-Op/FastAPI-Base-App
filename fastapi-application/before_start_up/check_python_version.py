import logging
import sys

logger = logging.getLogger(__name__)


def check_version() -> None:
    if not sys.version_info >= (3, 12, 7):
        logger.error("Your version of Python must be at least 3.12.7")
        raise RuntimeError(
            """
            Your Python version must be at least 3.12.7. 
            Please upgrade your version of Python interpreter.
        """
        )
    logger.info(
        "Python version: %s is ok",
        sys.version_info,
    )
