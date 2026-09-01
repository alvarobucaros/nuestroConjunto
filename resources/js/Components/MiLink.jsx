import React, { useState } from 'react';
import { Link} from '@inertiajs/react';

export default function MiInput({ Href, Label}) {
   
    return (
        <Link href={Href} 
            className="hover:bg-teal-500 p-2 flex space-x-4 text-gray-700 
            text-sm rounded-lg w-50 mx-auto justify-center">
            {Label}
        </Link>
    );
}
