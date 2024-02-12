import React from 'react';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import _ from "lodash";
import {CommentFields} from "~/backendTypes/blog/comment";

export default function Comments() {
    const tableItems: CommentFields[] = [
        CommentFields.postId,
        CommentFields.isActive,
        CommentFields.authorName,
        CommentFields.text
    ];

    const editFormItems = [
        {
            name: CommentFields.postId,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: CommentFields.isActive,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: CommentFields.authorName,
            type: FormEditFieldTypes.string,
        },
        {
            name: CommentFields.text,
            type: FormEditFieldTypes.textarea,
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.blogComments.get}
            deleteTableItem={Api.blogComments.delete}
            updateItem={Api.blogComments.update}
            addItem={Api.blogComments.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
