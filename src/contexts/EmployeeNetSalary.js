import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    addDoc,
    updateDoc,
    setDoc,
    doc,
    where,
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId");
let salaryCollectionRef = collection(db, `companyprofile/${compId}/salary`);

class EmployeeNetSalary {



    addSalary = (id, netSalary) => {
        return setDoc(doc(salaryCollectionRef, id), netSalary);

    };

    getSalary = async (id) => {

        let allData = await getDoc(doc(salaryCollectionRef, id))
        console.log('success2', allData)
        return {
            ...allData.data(),
            id: allData.id,
        };
    };

    // getUserCurrent = async (id,) => {
    //     let compId = sessionStorage.getItem("compId")
    //     const q = await getDoc(doc(db, `companyprofile/${compId}/users`), id);
    //     console.log('getUserCurrent', q)
    //     return {
    //         ...q.data(),
    //         id: q.id,
    //     };
    // }



    getUserCurrent = async (id, compid) => {
        let tempId = compid ? compid : compId;
        const q = doc(db, tempId == "undefined" || !tempId ? "admins" : `companyprofile/${tempId}/users`, id);
        let rec = await getDoc(q);
        return rec.data();
    };

}

export default new EmployeeNetSalary();
