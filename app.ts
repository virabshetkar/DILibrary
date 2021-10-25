import { setup } from "./setup";

function main() {
	const { basicServiceProvider, serviceProvider } = setup();

	const multiAdd = serviceProvider.inject("multiAddService");
	const add = basicServiceProvider.inject("addService");

	const res1 = multiAdd.addAll(1, 2, 3, 4, 5, 6, 7, 8, 9);
	const res2 = add.add(1, 2);

	console.log(res1, res2);
}

main();
