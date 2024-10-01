#!/bin/bash

# This script simulates users GET query for "http://site.local:443/index" end-point.

# It is used to get/test prometheus and grafana metrics

# DO NOT forget to chmod +x to run the script!!!

# Number of queries
NUM_REQUESTS=10000

# URL for the query
URL="http://site.local:443/index"

# Query header
HEADER="accept: application/json"

# Loop
for ((i=1; i<=NUM_REQUESTS; i++))
do
  curl -X 'GET' "$URL" -H "$HEADER"
  echo "Query #$i done"
done
