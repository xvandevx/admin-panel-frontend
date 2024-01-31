import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Tags from "~/components/pages/blog/tags";


export default function TagsPageDetail() {

    return (
        <MainLayout>
            <Tags/>
        </MainLayout>
    )
}