// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function logServer(obj: any): void {
	console.log(JSON.stringify(obj, null, 2));
}
