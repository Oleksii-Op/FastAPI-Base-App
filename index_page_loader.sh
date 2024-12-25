#!/bin/bash

# This script simulates asynchronous GET queries to the specified endpoint.
# It is used to test Prometheus and Grafana metrics.

# DO NOT forget to chmod +x to run the script!!!

# Number of queries
NUM_REQUESTS=10000


read -p "Enter url for load test 'https://localhost/index' -> " URL
#URL="https://192.168.1.73/index"


HEADER="accept: application/json"

# Maximum number of parallel requests
MAX_PARALLEL=50

# Function to perform a single query
make_request() {
  curl --insecure -X 'GET' "$URL" -H "$HEADER" &> /dev/null
  echo "Query #$1 done"
}

# Counter for active background jobs
active_jobs=0


for ((i=1; i<=NUM_REQUESTS; i++)); do
  make_request "$i" &
  ((active_jobs++))

  # Limit the number of parallel jobs
  if ((active_jobs >= MAX_PARALLEL)); then
    wait -n  # Wait for at least one background job to finish
    ((active_jobs--))
  fi
done

wait

echo "All $NUM_REQUESTS queries completed."
