'use strict';

import { 
    S3Client, 
    GetObjectCommand,
    PutObjectCommand
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Region = process.env.AWS_DEFAULT_REGION;
const S3Bucket = process.env.S3_BUCKET;

const client = new S3Client({ region: Region });

export const PutS3Item = async function PutS3Item(Item, ObjectKey, Bucket = S3Bucket) {
    const command = new PutObjectCommand({
        "Body": Item,
        "Bucket": Bucket,
        "ObjectKey": ObjectKey
    });
    try {
        const results = await client.send(command);
        return results
        
    } catch (error) {
        console.log(error)
        return error.name
    }
};

export const GetS3Item = async function GetS3Item(ObjectKey, Bucket = S3Bucket) {
    const command = new GetObjectCommand({
        "Bucket": Bucket,
        "Key": ObjectKey
    });
    try {
        const results = await client.send(command);
        return results
        
    } catch (error) {
        console.log(error)
        return error.name
    }
};

export const GenerateUploadSignedURL = async function GenerateUploadSignedURL({ObjectKey, Bucket = S3Bucket }) {
    const command = new PutObjectCommand({ 
        Bucket: Bucket, 
        Key: ObjectKey 
    });
        try {
        const results = await getSignedUrl(
            client, 
            command, 
            { expiresIn: 3600 }
        );
        return results
        
    } catch (error) {
        console.log(error)
        return error.name
    }

}

// Generate Signed URL for Download
export const GenerateDownloadSignedURL = async function GenerateDownloadSignedURL({ObjectKey, Bucket = S3Bucket }) {
    const command = new GetObjectCommand({ 
        Bucket: Bucket, 
        Key: ObjectKey 
    });
        try {
        const results = await getSignedUrl(
            client, 
            command, 
            { expiresIn: 3600 }
        );
        return results
        
    } catch (error) {
        console.log(error)
        return error.name
    }

}
