import { db } from "../firebase-config";
import {
    collection,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove

} from "firebase/firestore";
const companyProfileCollectionRef = collection(db, "companyprofile");

class CompanyProContext {
    getCompanyProfile = async(id) => {
        const profileInfo= doc(db,"companyprofile",id);
        let rec=await getDoc(profileInfo);
        let recordData=rec.data();
        return recordData;
    };
   
    createCompInfo = (newInfo) => {
        return setDoc(doc(db,"companyprofile",newInfo.orgcode),newInfo);
    };

    deleteCompInfo = (id, updateCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        let field = Object.keys(updateCompInfo)[0]
        return updateDoc(companyDoc, {[`${field}`]: arrayRemove(updateCompInfo[`${field}`])});
    };
    
    addCompInfo = (id, updateCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        let field = Object.keys(updateCompInfo)[0]
        return updateDoc(companyDoc, {[`${field}`]: arrayUnion(updateCompInfo[`${field}`])});
    };

    editCompInfo = async (id, oldCompInfo, newCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        let field = Object.keys(newCompInfo)[0]
        await updateDoc(companyDoc, {[`${field}`]: arrayRemove(oldCompInfo[`${field}`])});
        updateDoc(companyDoc, {[`${field}`]: arrayUnion(newCompInfo[`${field}`])});
        return;
    }
    
    updateCompInfo = (id, updateCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        return updateDoc(companyDoc, updateCompInfo);
    };
}

export default new CompanyProContext();