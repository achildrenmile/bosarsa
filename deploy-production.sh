#!/usr/bin/env bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Load environment variables
if [ -f ".env.production" ]; then
    source .env.production
else
    echo -e "${RED}Error: .env.production file not found${NC}"
    exit 1
fi

# Validate required variables
REQUIRED_VARS="DEPLOY_HOST REMOTE_DIR CONTAINER_NAME IMAGE_NAME CONTAINER_PORT SITE_URL"
for var in $REQUIRED_VARS; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}Error: $var is not set in .env.production${NC}"
        exit 1
    fi
done

# Check for --rebuild flag
REBUILD_FLAG=""
if [ "$1" == "--rebuild" ]; then
    REBUILD_FLAG="--no-cache"
    echo -e "${YELLOW}Rebuild flag set — will build without cache${NC}"
fi

echo -e "${GREEN}=== Deploying BOS-ARSA to $DEPLOY_HOST ===${NC}"
echo "Host: $DEPLOY_HOST"
echo "Remote dir: $REMOTE_DIR"
echo "Container: $CONTAINER_NAME"
echo "Port: $CONTAINER_PORT"
echo ""

# Step 1: Ensure remote directory exists and sync files
echo -e "${GREEN}Step 1: Syncing files...${NC}"
ssh "$DEPLOY_HOST" "mkdir -p '$REMOTE_DIR'"
rsync -avz --delete \
    --exclude '.git' \
    --exclude '.env.production' \
    ./ "$DEPLOY_HOST:$REMOTE_DIR/"

# Step 2: Build and start container
echo -e "${GREEN}Step 2: Building and starting container...${NC}"
ssh "$DEPLOY_HOST" "
    cd '$REMOTE_DIR'
    docker build $REBUILD_FLAG -t '$IMAGE_NAME' .
    docker compose up -d --force-recreate --build
"

# Step 3: Verify deployment
echo -e "${GREEN}Step 3: Verifying deployment...${NC}"
sleep 3

CONTAINER_STATUS=$(ssh "$DEPLOY_HOST" "docker ps --filter 'name=$CONTAINER_NAME' --format '{{.Status}}'")
echo "Container status: $CONTAINER_STATUS"

LOCAL_PORT=$(echo $CONTAINER_PORT | cut -d: -f1)
if ssh "$DEPLOY_HOST" "curl -sf -o /dev/null http://localhost:$LOCAL_PORT"; then
    echo -e "${GREEN}✓ Container is running on port $LOCAL_PORT${NC}"
else
    echo -e "${YELLOW}⚠ Container not yet responding on port $LOCAL_PORT${NC}"
fi

if curl -sf -o /dev/null "$SITE_URL" 2>/dev/null; then
    echo -e "${GREEN}✓ Site is accessible at $SITE_URL${NC}"
else
    echo -e "${YELLOW}⚠ Public URL not yet accessible — configure Cloudflare tunnel${NC}"
fi

echo ""
echo -e "${GREEN}=== Deployment complete ===${NC}"
