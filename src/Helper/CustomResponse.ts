import { NextResponse } from "next/server";
import { HTTP_CONFLICT, HTTP_OK } from "../Constants/HttpStatusCode";

export class CustomResponse{
    private body: object | null;
    
    constructor(body: object | null){
        this.body = body;
    }

    public ok(){
        return NextResponse.json(this.body, { status: HTTP_OK });
    }

    public conflict(){
        return NextResponse.json(this.body,{status: HTTP_CONFLICT})
    }
}