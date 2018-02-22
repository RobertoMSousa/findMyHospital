import * as async from "async";
import { Request, Response, NextFunction } from "express";
import { close } from "fs";
const request = require("express-validator");
const csv = require("csvtojson");

const csvFilePath =  __dirname + "/../../../assets/Hospital.csv";


import { Hospital } from "../../models/Hospital";


// calculate the distance
function calcDistance(lat1: string, lon1: any, lat2: string, lon2: any, callback: (distance: number) => void): void {
	const R = 6371; // Radius of the earth in km
	const dLat = (parseFloat(lat2) - parseFloat(lat1)) * Math.PI / 180;  // deg2rad below
	const dLon = (parseFloat(lon2) - parseFloat(lon1)) * Math.PI / 180;
	const a = 0.5 - Math.cos(dLat) / 2 + Math.cos(parseFloat(lat1) * Math.PI / 180) * Math.cos(parseFloat(lat2) * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;

	callback(R * 2 * Math.asin(Math.sqrt(a)));
	return;
}

/**
 * GET /nearrest
 * Get the near hospital based on the latitude and longitude position using the csv file
 */
export const getNearHospitalsCSV = (req: Request, res: Response) => {

	// verify if the required params are provided
	if (!req.query.lon || !req.query.lat) {
		res.status(400).json({message: "missing required params for the search", error: undefined, data: undefined});
		return;
	}

	// verify if lat and long are valid
	if (Number.isNaN(Number.parseFloat(req.query.lon)) || Number.isNaN(Number.parseFloat(req.query.lat))) {
		res.status(400).json({message: "not valid latitude or/and longitude", error: undefined, data: undefined});
		return;
	}

	console.log("csvFilePath-->", csvFilePath); // roberto

	const augmentedCoord = Object.create([]);

	csv()
	.fromFile(csvFilePath)
	.on("json", (jsonObj) => {
		calcDistance(req.query.lat, req.query.lon, jsonObj.Latitude, jsonObj.Longitude, (distance) => {
			jsonObj.distance = distance;
			augmentedCoord.push(jsonObj);
			augmentedCoord.distance = distance;
		});
	})
	.on("done", (error) => {
		res.status(200).json({message: "success", error: undefined, data: augmentedCoord.sort(function(a, b) {return a.distance - b.distance; }).slice(0, 5)});
		return;
	});
};

/**
 * GET /nearrest/mongo
 * Get the near hospital based on the latitude and longitude position using the mongo collection insteadof the CSV file
 */
export const getNearHospitalsMongo = (req: Request, res: Response) => {

	// verify if the required params are provided
	if (!req.query.lon || !req.query.lat) {
		res.status(400).json({message: "missing required params for the search", error: undefined, data: undefined});
		return;
	}

	// verify if lat and long are valid
	if (Number.isNaN(Number.parseFloat(req.query.lon)) || Number.isNaN(Number.parseFloat(req.query.lat))) {
		res.status(400).json({message: "not valid latitude or/and longitude", error: undefined, data: undefined});
		return;
	}

	// find a location
	Hospital.find({
		"loc.coord": {
			$near: [req.query.lon, req.query.lat]
		}
	}).limit(5).exec(function(err, locations) {
		if (err) {
			res.status(500).json({message: undefined, error: err, data: undefined});
			return;
		}
		res.status(200).json({message: "success", error: undefined, data: locations});
		return;
	});
};
