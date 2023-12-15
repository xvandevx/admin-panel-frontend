import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Educations from "~/components/edications";


export default function Infobloks({id}: any) {

    return (
        <MainLayout>
            <Educations id={id}/>
        </MainLayout>
    )
}

export const getServerSideProps = ({query}: any)  => {
    return {
        props: {
            id: Number(query.id)
        }
    }
};