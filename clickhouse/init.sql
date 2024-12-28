USE docker;

SET enable_json_type = 1;

CREATE TABLE IF NOT EXISTS dockerlogs (
    container_created_at DateTime64,
    container_id String,
    container_name String,
    host String,
    image String,
    label JSON,
    message String,
    source_type String,
    stream String,
    timestamp DateTime64)
ENGINE = MergeTree()
ORDER BY container_name;
