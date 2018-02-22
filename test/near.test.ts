import * as request from "supertest";
import * as app from "../src/app";

const chai = require("chai");
const expect = chai.expect;


describe("test the near route with csv file", () => {

	it("get the 400 error if no lat and lon provided", (done) => {
		request(app).get("/nearest/csv")
		.set("Accept", "application/json")
		.expect(400)
		.expect("Content-Type", /json/)
		.end(function (err, res) {
		if (err) {
			done(err);
			return;
		}
		chai.expect(res.body.message).to.equal("missing required params for the search");
		done();
		return;
		});
	});


	it("should get the 400 error if the lat an long values are not valid", (done) => {
		request(app).get("/nearest/csv?lat=novalid&lon=10")
		.set("Accept", "application/json")
		.expect(400)
		.expect("Content-Type", /json/)
		.end(function (err, res) {
		if (err) {
			done(err);
			return;
		}
		chai.expect(res.body.message).to.equal("not valid latitude or/and longitude");
		done();
		return;
		});
	});


	it("should get the 5 nearest hopsital based on the position", (done) => {
		request(app).get("/nearest/csv?lat=51.3800087&lon=-0.406027377")
		.set("Accept", "application/json")
		.expect(200)
		.expect("Content-Type", /json/)
		.end(function (err, res) {
		if (err) {
			done(err);
			return;
		}
		chai.expect(res.body.message).to.equal("success");

		chai.expect(res.body.data.length).to.equal(5);

		// check the institutions id
		chai.expect(res.body.data[0].OrganisationID).to.equal("17970");
		chai.expect(res.body.data[1].OrganisationID).to.equal("18731");
		chai.expect(res.body.data[2].OrganisationID).to.equal("63283");
		chai.expect(res.body.data[3].OrganisationID).to.equal("62172");
		chai.expect(res.body.data[4].OrganisationID).to.equal("17995");

		// check if it returns the correct params
		chai.expect(res.body.data[0].OrganisationName).to.equal("Walton Community Hospital");
		chai.expect(res.body.data[1].OrganisationName).to.equal("Molesey Community Hospital");
		chai.expect(res.body.data[2].OrganisationName).to.equal("Weybridge Community Hospital");
		chai.expect(res.body.data[3].OrganisationName).to.equal("Cobham Day Surgery Hospital");
		chai.expect(res.body.data[4].OrganisationName).to.equal("Sexual Health Surrey - Cobham Community Hospital");

		// check if the hospital are on the correct order
		chai.expect(res.body.data[0].distance).to.be.at.most(res.body.data[1].distance);
		chai.expect(res.body.data[1].distance).to.be.at.most(res.body.data[2].distance);
		chai.expect(res.body.data[2].distance).to.be.at.most(res.body.data[3].distance);
		chai.expect(res.body.data[3].distance).to.be.at.most(res.body.data[4].distance);

		done();
		return;
		});
	});
});



describe("test the near route with mongo DB", () => {

	it("get the 400 error if no lat and lon provided", (done) => {
		request(app).get("/nearest/mongo")
		.set("Accept", "application/json")
		.expect(400)
		.expect("Content-Type", /json/)
		.end(function (err, res) {
		if (err) {
			done(err);
			return;
		}
		chai.expect(res.body.message).to.equal("missing required params for the search");
		done();
		return;
		});
	});


	it("should get the 400 error if the lat an long values are not valid", (done) => {
		request(app).get("/nearest/mongo?lat=novalid&lon=10")
		.set("Accept", "application/json")
		.expect(400)
		.expect("Content-Type", /json/)
		.end(function (err, res) {
		if (err) {
			done(err);
			return;
		}
		chai.expect(res.body.message).to.equal("not valid latitude or/and longitude");
		done();
		return;
		});
	});


	it("should get the 5 nearest hopsital based on the position", (done) => {
		request(app).get("/nearest/mongo?lat=51.3800087&lon=-0.406027377")
		.set("Accept", "application/json")
		.expect(200)
		.expect("Content-Type", /json/)
		.end(function (err, res) {
		if (err) {
			done(err);
			return;
		}
		chai.expect(res.body.message).to.equal("success");

		chai.expect(res.body.data.length).to.equal(5);

		// check the institutions id
		chai.expect(res.body.data[0].OrganisationID).to.equal("17970");
		chai.expect(res.body.data[1].OrganisationID).to.equal("18731");
		chai.expect(res.body.data[2].OrganisationID).to.equal("62172");
		chai.expect(res.body.data[3].OrganisationID).to.equal("17995");
		chai.expect(res.body.data[4].OrganisationID).to.equal("63283");

		// check if it returns the correct params
		chai.expect(res.body.data[0].OrganisationName).to.equal("Walton Community Hospital");
		chai.expect(res.body.data[1].OrganisationName).to.equal("Molesey Community Hospital");
		chai.expect(res.body.data[2].OrganisationName).to.equal("Cobham Day Surgery Hospital");
		chai.expect(res.body.data[4].OrganisationName).to.equal("Weybridge Community Hospital");
		chai.expect(res.body.data[3].OrganisationName).to.equal("Sexual Health Surrey - Cobham Community Hospital");

		done();
		return;
		});
	});
});
