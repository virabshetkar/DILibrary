import { create, Injector, LifeCycle } from "./DILib";

export interface IAddService {
	add(x: number, y: number): number;
}

export class AddService implements IAddService {
	/**
	 *
	 */
	constructor() {}

	add(x: number, y: number) {
		return 1;
	}
}

export class BetterAddService implements IAddService {
	/**
	 *
	 */
	constructor() {}

	add(x: number, y: number) {
		return x + y;
	}
}
export interface IMultiAddService {
	addAll(...args: number[]): number;
}

export class MultiAddService implements IMultiAddService {
	private _addService: IAddService;
	/**
	 *
	 */
	constructor(sp: BasicServiceProvider) {
		this._addService = sp.inject("addService");
	}
	addAll(...args: number[]): number {
		return args.reduce(this._addService.add);
	}
}

export type BasicServiceProvider = Injector<Services>;

export type ServiceProvider = Injector<Services2>;

export interface Services {
	addService: IAddService;
}

export interface Services2 {
	multiAddService: IMultiAddService;
}

export function setup() {
	const basicServiceProvider = new Injector<Services>({ addService: create(BetterAddService, LifeCycle.TRANSIENT) }, [], false);
	const serviceProvider = new Injector<Services2>({ multiAddService: create(MultiAddService) }, [basicServiceProvider], false);

	return { basicServiceProvider, serviceProvider };
}
