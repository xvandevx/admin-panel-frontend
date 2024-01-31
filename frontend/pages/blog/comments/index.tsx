import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import Comments from "~/components/pages/blog/comments";


export default function CommentsPage() {
    return (
        <MainLayout>
            <Comments/>
        </MainLayout>
    )
}
