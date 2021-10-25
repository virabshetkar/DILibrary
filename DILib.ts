export class Injector<T> {
	constructor(private _injects: Inject<T>, private _di: DIContainer, containsSelf: boolean = true) {
		if (containsSelf) {
			this._di.splice(0, 0, this);
		}
	}

	inject = <K extends keyof T>(key: K): T[K] => {
		const { _injects, _di } = this;
		return _injects[key].getInstance(_di) as T[K];
	};
}

export class Injectable<T> {
	private _instance?: T;
	constructor(private _implementor: new (...di: DIContainer) => T, private _lifeCycle: LifeCycle) {}

	getInstance(di: DIContainer): T {
		const { _implementor, _lifeCycle } = this;
		if (_lifeCycle === LifeCycle.TRANSIENT) return new _implementor(...di);
		else {
			this._instance = this._instance ?? new _implementor(...di);
			return this._instance;
		}
	}
}

export type Inject<T> = {
	[K in keyof T]: Injectable<T[K]>;
};

export const create = <T>(implementor: new (...injectors: Injector<any>[]) => T, lifeCycle?: LifeCycle) => {
	return new Injectable(implementor, lifeCycle ?? LifeCycle.SINGLETON);
};

export type DIContainer = Injector<any>[];

export enum LifeCycle {
	SINGLETON,
	TRANSIENT,
}
