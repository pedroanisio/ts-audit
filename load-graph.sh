#!/bin/bash
# =============================================================================
# Load Knowledge Graph into Neo4j
# =============================================================================

set -e

NEO4J_URL="${NEO4J_URL:-bolt://localhost:7687}"
NEO4J_USER="${NEO4J_USER:-neo4j}"
NEO4J_PASSWORD="${NEO4J_PASSWORD:-knowledge_graph_2024}"
CYPHER_FILE="${1:-complete_graph_v2.cypher}"

echo "=============================================="
echo "  Knowledge Graph Loader"
echo "=============================================="
echo ""
echo "Neo4j URL: $NEO4J_URL"
echo "Cypher File: $CYPHER_FILE"
echo ""

# Check if file exists
if [ ! -f "$CYPHER_FILE" ]; then
    echo "ERROR: Cypher file not found: $CYPHER_FILE"
    exit 1
fi

# Check if cypher-shell is available
if command -v cypher-shell &> /dev/null; then
    echo "Using local cypher-shell..."
    cypher-shell -a "$NEO4J_URL" -u "$NEO4J_USER" -p "$NEO4J_PASSWORD" < "$CYPHER_FILE"
else
    echo "Using Docker exec to run cypher-shell..."
    
    # Wait for Neo4j to be ready
    echo "Waiting for Neo4j to be ready..."
    MAX_RETRIES=30
    RETRY_COUNT=0
    
    while ! docker exec ts-audit-neo4j wget -q --spider http://localhost:7474 2>/dev/null; do
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
            echo "ERROR: Neo4j did not become ready in time"
            exit 1
        fi
        echo "  Waiting... ($RETRY_COUNT/$MAX_RETRIES)"
        sleep 2
    done
    
    echo "Neo4j is ready!"
    echo ""
    echo "Loading graph (this may take a few minutes)..."
    echo ""
    
    # Load the Cypher file
    docker exec -i ts-audit-neo4j cypher-shell \
        -u "$NEO4J_USER" \
        -p "$NEO4J_PASSWORD" \
        < "$CYPHER_FILE"
fi

echo ""
echo "=============================================="
echo "  Graph loaded successfully!"
echo "=============================================="
echo ""
echo "Access Neo4j Browser at: http://localhost:7474"
echo "Username: $NEO4J_USER"
echo "Password: $NEO4J_PASSWORD"
echo ""
echo "Quick queries to try:"
echo "  // Count all nodes"
echo "  MATCH (n) RETURN labels(n)[0] AS label, count(*) AS count ORDER BY count DESC"
echo ""
echo "  // Get research threads"
echo "  MATCH (t:ResearchThread) RETURN t.id, t.name, t.core_question"
echo ""
echo "  // Get MSRCP components"
echo "  MATCH (p:Protocol {name: 'MSRCP'})-[:HAS_COMPONENT]->(c) RETURN c.name, c.module"
echo ""

