export default class Url {
	static getVueRootPath(){
		const l = window.location;
		return `${l.origin}${l.pathname}#`;
	}
}