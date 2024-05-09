import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
} from '@aws-sdk/client-cognito-identity';

const awsService = () => {
  const generateUploadUrl = async (fileInput) => {
    let identityPool = 'us-east-1:532f83dc-f7a7-497e-bce0-a9363789b5f0';
    const client = new CognitoIdentityClient({ region: 'us-east-1' });
    const input = {
      // GetCredentialsForIdentityInput
      IdentityId: identityPool, // required
    };
    const command = new GetCredentialsForIdentityCommand(input);
    const response = await client.send(command);
    // let cognitoClient = new CognitoIdentityClient({
    //   region: 'us-east-1',
    // });

    // let input = {
    //   // GetCredentialsForIdentityInput
    //   IdentityId: identityPoolId,
    // };

    // let command = new GetCredentialsForIdentityCommand(input);
    // let response = await cognitoClient.send(command);
    // console.log(response);

    // AWS.config.update({
    //   region: 'us-east-1',
    //   credentials: new AWS.CognitoIdentityCredentials({
    //     IdentityPoolId: identityPool,
    //   }),
    // });

    let s3 = new S3Client({
      region: 'us-east-1',
      credentials: response?.Credentials,
    });

    const params = {
      Bucket: 'fovus-files',
      Key: fileInput.name,
      ContentType: fileInput.type,
    };

    try {
      let command = new PutObjectCommand(params);
      let response = await s3.send(command);
      return response;
    } catch (error) {
      console.error('Error generating upload URL:', error);
      return null;
    }
  };

  return {
    generateUploadUrl,
  };
};

export default awsService();
