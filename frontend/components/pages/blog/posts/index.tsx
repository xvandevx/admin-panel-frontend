import React from 'react';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import _ from "lodash";
import {PostFields} from "~/backendTypes/blog/post";

export default function Posts() {
    const tableItems: string[] = [
        PostFields.isActive,
        PostFields.name,
        PostFields.image,
        PostFields.date,
        PostFields.views,
        PostFields.likes,
        PostFields.comments,
        PostFields.tags,
    ];

    const editFormItems = [
        {
            name: PostFields.isActive,
            required: true,
            type: FormEditFieldTypes.boolean,
        },
        {
            name: PostFields.name,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.image,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.date,
            required: true,
            type: FormEditFieldTypes.date,
        },
        {
            name: PostFields.tagIds,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.text,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.views,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PostFields.likes,
            required: true,
            type: FormEditFieldTypes.string,
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.blogPosts.get}
            deleteTableItem={Api.blogPosts.delete}
            updateItem={Api.blogPosts.update}
            addItem={Api.blogPosts.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
