/// <reference types="multer" />
export declare class CreateElectionrDto {
    electionName: string;
    startTime: string;
    endTime: string;
    quorum: number;
    total: number;
    electionInfo: string;
}
export declare class candidateDTO {
    number: number;
    candidateName: string;
    profile: Express.Multer.File;
    candidateInfo: string;
}
