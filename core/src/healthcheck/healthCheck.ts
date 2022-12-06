import mqttClient from "mqttClient";
import osu from "node-os-utils";

class HealthCheck {
  public static task = setInterval(async () => {
    let [cpu, mem, drive, netstat] = await Promise.all([
      osu.cpu.usage(),
      osu.mem.info(),
      osu.drive.info(""),
      osu.netstat.inOut(),
    ]);
    mqttClient.publish(
      "$CORE/health",
      JSON.stringify({
        cpu,
        mem,
        drive,
        netstat,
        uptime: osu.os.uptime().toFixed(),
        ts: new Date(),
      })
    );
  }, 1000);
  public static async getSystemInfo() {
    const os = await osu.os.oos();
    return {
      ip: osu.os.ip(),
      hostname: osu.os.hostname(),
      platform: osu.os.platform(),
      os,
      type: osu.os.type(),
      arch: osu.os.arch(),
      cpuCount: osu.cpu.count(),
      cpuModel: osu.cpu.model(),
    };
  }
}
export default HealthCheck;
