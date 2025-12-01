# =============================================================================
# Knowledge Graph Management
# =============================================================================

.PHONY: help up down logs load clean reset shell stats

# Default target
help:
	@echo ""
	@echo "Knowledge Graph Commands:"
	@echo "========================="
	@echo ""
	@echo "  make up      - Start Neo4j container"
	@echo "  make down    - Stop Neo4j container"
	@echo "  make logs    - View Neo4j logs"
	@echo "  make load    - Load the knowledge graph into Neo4j"
	@echo "  make shell   - Open cypher-shell in container"
	@echo "  make stats   - Show graph statistics"
	@echo "  make clean   - Stop and remove volumes (DATA LOSS!)"
	@echo "  make reset   - Clean and reload everything"
	@echo ""
	@echo "Access:"
	@echo "  Browser:  http://localhost:7474"
	@echo "  Bolt:     bolt://localhost:7687"
	@echo "  User:     neo4j"
	@echo "  Password: knowledge_graph_2024"
	@echo ""

# Start Neo4j
up:
	@echo "Starting Neo4j..."
	docker compose up -d
	@echo ""
	@echo "Waiting for Neo4j to be ready..."
	@sleep 5
	@until docker exec ts-audit-neo4j wget -q --spider http://localhost:7474 2>/dev/null; do \
		echo "  Still waiting..."; \
		sleep 2; \
	done
	@echo ""
	@echo "Neo4j is ready at http://localhost:7474"

# Stop Neo4j
down:
	@echo "Stopping Neo4j..."
	docker compose down

# View logs
logs:
	docker compose logs -f neo4j

# Load the knowledge graph
load: up
	@echo ""
	@echo "Loading knowledge graph..."
	@echo "This may take 1-3 minutes for ~8600 lines of Cypher..."
	@echo ""
	./load-graph.sh

# Open cypher-shell
shell:
	docker exec -it ts-audit-neo4j cypher-shell -u neo4j -p knowledge_graph_2024

# Show graph statistics
stats:
	@echo ""
	@echo "Graph Statistics:"
	@echo "================="
	@docker exec ts-audit-neo4j cypher-shell -u neo4j -p knowledge_graph_2024 \
		"MATCH (n) RETURN labels(n)[0] AS label, count(*) AS count ORDER BY count DESC LIMIT 20"
	@echo ""
	@docker exec ts-audit-neo4j cypher-shell -u neo4j -p knowledge_graph_2024 \
		"MATCH ()-[r]->() RETURN type(r) AS relationship, count(*) AS count ORDER BY count DESC LIMIT 20"

# Clean everything (WARNING: DATA LOSS)
clean:
	@echo "WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] || exit 1
	docker compose down -v
	@echo "All data removed."

# Reset and reload
reset: clean load
	@echo "Reset complete!"

