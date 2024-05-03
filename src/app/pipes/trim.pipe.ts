import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'trim',
    pure:false
})

export class TrimPipe implements PipeTransform{

    transform(value: any) {
        if(!value){
            return ''
        }
        return value.replace(/\s/g, "");
    }

}