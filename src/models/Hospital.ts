
import * as mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
	OrganisationID: { type: String, unique: true, required: true },
	OrganisationCode: { type: String, required: true},
	Sector: {type: String, required: true},
	OrganisationStatus: {type: String, required: true},
	IsPimsManaged: {type: String, required: true},
	OrganisationName: {type: String, required: true},
	Postcode: {type: String, required: true},
	loc: {
		type: {
			type: String,
			default: "Point"
		},
		coord: {
			type: [Number],
			index: "2dsphere"
		}
	},
	ParentODSCode: {type: String, required: true},
	ParentName: {type: String, required: true},
	Phone: {type: String},
	Email: {type: String},
	Website: {type: String},
	Fax: {type: String}
}, { timestamps: true });


export const Hospital = mongoose.model("Hospital", hospitalSchema);