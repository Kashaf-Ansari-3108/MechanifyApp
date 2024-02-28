import React from "react";
import { ActivityIndicator } from "react-native";
import { red } from "../../../font";

const BtnLoader = ()=>{
    return <ActivityIndicator color={red} size={'large'}/>
}

export default BtnLoader