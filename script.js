    const canvas = document.getElementById('graphCanvas');

    const ctx = canvas.getContext('2d');

    const permanentNodes = [
      [-278, -246], [-232, -174], [-303, -124], [-210, 11], [-214, 55], [-171, 122],
      [-203, 154], [-195, 180], [-174, 24], [-23, 55], [-23, 156], [-22, 87],
      [-168, -76], [-168, -7], [-21, -46], [103, -47], [202, -51], [201, 18], [-60, 159],
      [104, 86], [208, 90], [274, 88], [-190, -25]
    ];

    const permanentEdges = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
      [6, 7], [7, 18], [18, 10], [10, 11], [11, 9], [9, 8],
      [8, 13], [11, 19], [19, 20], [20, 21], [9, 14], [14, 12],
      [14, 15], [15, 16], [16, 17], [19, 15], [1, 12],
      [12, 22], [13, 22], [22, 3]
    ];

    function calculateDistance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    let graph = {};
    function buildGraph() {
      for (let i = 0; i < permanentNodes.length; i++) {
        graph[i] = [];
      }
      for (const [i, j] of permanentEdges) {
        const n1 = permanentNodes[i];
        const n2 = permanentNodes[j];
        const dist = calculateDistance(n1[0], n1[1], n2[0], n2[1]);
        graph[i].push({ node: j, dist });
        graph[j].push({ node: i, dist });
      }
    }

    function dijkstra(start, end) {
      let queue = [{ node: start, cost: 0 }];
      let distances = { [start]: 0 };
      let prev = {};
      let visited = new Set();

      while (queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const { node, cost } = queue.shift();
        if (visited.has(node)) continue;
        visited.add(node);

        if (node === end) break;

        for (const { node: neighbor, dist } of graph[node]) {
          const newCost = cost + dist;
          if (!(neighbor in distances) || newCost < distances[neighbor]) {
            distances[neighbor] = newCost;
            queue.push({ node: neighbor, cost: newCost });
            prev[neighbor] = node;
          }
        }
      }

      let path = [];
      let current = end;
      while (current in prev) {
        path.unshift(current);
        current = prev[current];
      }
      path.unshift(start);
      return path;
    }

    function drawGraph() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'black';
      for (const [i, j] of permanentEdges) {
        const [x1, y1] = permanentNodes[i];
        const [x2, y2] = permanentNodes[j];
        ctx.beginPath();
        ctx.moveTo(x1 + 400, y1 + 300);
        ctx.lineTo(x2 + 400, y2 + 300);
        ctx.stroke();
      }
    }

    function drawPath(path) {
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 3;
      ctx.beginPath();
      let [x, y] = permanentNodes[path[0]];
      ctx.moveTo(x + 400, y + 300);
      for (let i = 1; i < path.length; i++) {
        [x, y] = permanentNodes[path[i]];
        ctx.lineTo(x + 400, y + 300);
      }
      ctx.stroke();
      ctx.lineWidth = 1;
    }

    let selectedNodes = [];
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - 400;
      const y = e.clientY - rect.top - 300;

      let nearestNode = null;
      let minDistance = Infinity;

      permanentNodes.forEach((node, index) => {
        const [nodeX, nodeY] = node;
        const dist = calculateDistance(x, y, nodeX, nodeY);
        if (dist < minDistance) {
          minDistance = dist;
          nearestNode = index;
        }
      });

      selectedNodes.push(nearestNode);
      ctx.beginPath();
      ctx.arc(permanentNodes[nearestNode][0] + 400, permanentNodes[nearestNode][1] + 300, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();

      if (selectedNodes.length === 2) {
        const [start, end] = selectedNodes;
        const path = dijkstra(start, end);
        drawGraph();  // Clear and redraw base graph
        drawPath(path);
        selectedNodes = [];
      }
    });

    buildGraph();
    drawGraph();    