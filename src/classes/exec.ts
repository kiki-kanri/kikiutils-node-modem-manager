import { execaCommand } from '@esm2cjs/execa';

export default class Exec {
	async exec(command: string) {
		return (await execaCommand(command, { shell: true, timeout: 10000 })).stdout.trim();
	}

	async mmcli(command: string, parse = true) {
		const result = await this.exec(`sudo mmcli -J ${command}`);
		if (parse) return JSON.parse(result);
		return result;
	}
}
