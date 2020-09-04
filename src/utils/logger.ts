import * as path from 'path';
import * as fs from 'fs';
import { WriteStream } from 'fs';

class Logger {
  private readonly logDir: string = path.resolve(__dirname, '../../.log');
  private currentDay: Date = new Date();
  private logPath: string;
  private logStream: WriteStream;

  constructor() {
    this.logPath = this.getLogPath(this.currentDay);
    this.logStream = fs.createWriteStream(this.logPath, { flags: 'a' });
  }

  public error(_err: Error): Promise<void> {
    return this.writeLog('ERROR', _err.stack);
  }

  private async writeLog(_type: string, _message: string): Promise<void> {
    const now: Date = new Date();
    const message = `[${now} - ${_type}]: ${_message}\n\n`;

    // Create new log file for new day
    if (now.getDate() !== this.currentDay.getDate()) {
      this.logPath = this.getLogPath(now);
      this.currentDay = now;

      this.logStream.close();
      this.logStream = fs.createWriteStream(this.logPath, { flags: 'a' });
    }

    this.logStream.write(message);
  }

  private getLogPath(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${this.logDir}/${day}-${month}-${year}.log`;
  }
}

export default new Logger();
