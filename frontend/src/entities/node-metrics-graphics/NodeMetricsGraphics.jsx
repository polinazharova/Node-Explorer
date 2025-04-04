import { useEffect, useMemo, useRef } from "react";
import "./NodeMetricsGraphics.styles.scss";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";

const NodeMetricsGraphics = ({ nodeId }) => {
  const data = useSelector((state) => state.metricsNodes.metrics[nodeId]);

  const chartRefs = useRef({
    CPU: null,
    disk: null,
    memory: null,
  });

  const graphicsData = useMemo(() => {
    const X = [];
    const YCPU = [];
    const YDisk = [];
    const YMemory = [];

    let firstDay = 0,
      lastDay = 0;

    data?.forEach((el, index) => {
      const date = new Date(el["datetime"]);

      if (!firstDay) {
        firstDay = date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }

      if (index === data.length - 1) {
        lastDay = date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }

      const XDate = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

      X.push(XDate);
      YCPU.push(el["cpu"]);
      YDisk.push(el["disk"]);
      YMemory.push(el["memory"]);
    });

    return [
      {
        labels: X,
        datasets: [
          {
            label: `CPU utilization, % [${[firstDay]} - ${[lastDay]}]`,
            data: YCPU,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            pointBackgroundColor: "#fff",
          },
        ],
      },
      {
        labels: X,
        datasets: [
          {
            label: `Disk utilization, % [${[firstDay]} - ${[lastDay]}]`,
            data: YDisk,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "#fff",
          },
        ],
      },
      {
        labels: X,
        datasets: [
          {
            label: `Memory utilization, % [${[firstDay]} - ${[lastDay]}]`,
            data: YMemory,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "#fff",
          },
        ],
      },
    ];
  }, [data]);

  useEffect(() => {
    if (chartRefs.current.CPU) chartRefs.current.CPU.destroy();
    if (chartRefs.current.disk) chartRefs.current.disk.destroy();
    if (chartRefs.current.memory) chartRefs.current.memory.destroy();

    const CPUContext = document
      .getElementById("CPU-metric-graphic")
      ?.getContext("2d");
    const diskContext = document
      .getElementById("disk-metric-graphic")
      ?.getContext("2d");
    const memoryContext = document
      .getElementById("memory-metric-graphic")
      ?.getContext("2d");

    chartRefs.current.CPU = new Chart(CPUContext, {
      type: "bar",
      data: graphicsData[0],
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });

    chartRefs.current.disk = new Chart(diskContext, {
      type: "bar",
      data: graphicsData[1],
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });

    chartRefs.current.memory = new Chart(memoryContext, {
      type: "bar",
      data: graphicsData[2],
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });

    return () => {
      if (chartRefs.current.CPU) chartRefs.current.CPU.destroy();
      if (chartRefs.current.disk) chartRefs.current.disk.destroy();
      if (chartRefs.current.memory) chartRefs.current.memory.destroy();
    };
  }, [graphicsData]);

  return (
    <div className="main__node-metrics-graphics">
      <canvas id="CPU-metric-graphic"></canvas>
      <canvas id="disk-metric-graphic"></canvas>
      <canvas id="memory-metric-graphic"></canvas>
    </div>
  );
};

export default NodeMetricsGraphics;
