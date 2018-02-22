import express = require("express");
import nearCtrl = require("./nearest");


export namespace Routes {
	export function index(): express.Router {
		const router = express.Router();

		router.route("/csv")
			.get(nearCtrl.getNearHospitalsCSV);

		router.route("/mongo")
			.get(nearCtrl.getNearHospitalsMongo);

		return router;
	}
}