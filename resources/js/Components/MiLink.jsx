import React, { useState } from 'react';
import { Link} from '@inertiajs/react';

export default function MiInput({ Href, Label}) {
   
    return (
        <Link href={Href} 
            className="bg-teal-100 hover:bg-teal-500 p-4 flex space-x-4 text-gray-700 font-small rounded-lg w-32 mx-auto justify-center">
            {Label}
        </Link>
    );
}
