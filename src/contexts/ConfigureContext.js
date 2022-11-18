import { db } from "../firebase-config";
import {
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

class ConfigureContext {

    getConfigurations = async (page) => {
        const rec = await getDoc(doc(db, `companyprofile/${compId}/configurations`, page));
        return rec.data();
    };
    
    // createConfiguration = (page) => {
        //make all the confiurations here and set empty array
    //     return setDoc(doc(db, `companyprofile/${compId}/configurations`), newHoliday);
    // };

    addConfigurations = (page, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(values)[0]
        return updateDoc(newHoliday, {[`${field}`]: arrayUnion(...values[`${field}`])});
    };

    updateConfigurations = async (page, oldValues, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(oldValues)[0]
        await updateDoc(newHoliday, {[`${field}`]: arrayRemove(oldValues[`${field}`])});
        updateDoc(newHoliday, {[`${field}`]: arrayUnion(values[`${field}`])});
    };

    deleteConfigurations = (page, values) => {
        console.log(values)
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(values)[0]
        return updateDoc(newHoliday, {[`${field}`]: arrayRemove(values[`${field}`])});
    };
}


export default new ConfigureContext();
