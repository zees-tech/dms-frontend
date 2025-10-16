/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type AssignPermissionToEntityInput = {
  assignedToId: Scalars['UUID']['input'];
  assignmentType: AssignmentType;
  filePermissionId: Scalars['UUID']['input'];
};

export type AssignPermissionToFileInput = {
  fileId: Scalars['UUID']['input'];
  isAllowed?: Scalars['Boolean']['input'];
  isInheritable?: Scalars['Boolean']['input'];
  isInherited?: Scalars['Boolean']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type AssignPermissionToFolderEntityInput = {
  assignedToId: Scalars['UUID']['input'];
  assignmentType: AssignmentType;
  folderId: Scalars['UUID']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type AssignPermissionToFolderInput = {
  folderId: Scalars['UUID']['input'];
  isAllowed?: Scalars['Boolean']['input'];
  isInheritable?: Scalars['Boolean']['input'];
  isInherited?: Scalars['Boolean']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type AssigneeInfo = {
  __typename?: 'AssigneeInfo';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  type: AssignmentType;
};

export type AssigneeInfoFilterInput = {
  and?: InputMaybe<Array<AssigneeInfoFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AssigneeInfoFilterInput>>;
  type?: InputMaybe<AssignmentTypeOperationFilterInput>;
};

export enum AssignmentType {
  Group = 'GROUP',
  Role = 'ROLE',
  User = 'USER'
}

export type AssignmentTypeOperationFilterInput = {
  eq?: InputMaybe<AssignmentType>;
  in?: InputMaybe<Array<AssignmentType>>;
  neq?: InputMaybe<AssignmentType>;
  nin?: InputMaybe<Array<AssignmentType>>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChildFolder = {
  __typename?: 'ChildFolder';
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  createdByName: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hasChildren: Scalars['Boolean']['output'];
  hasFiles: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['UUID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateFileInput = {
  contentUrl: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expiry?: InputMaybe<Scalars['DateTime']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId: Scalars['UUID']['input'];
  pathName: Scalars['String']['input'];
  size?: Scalars['Long']['input'];
};

export type CreateFileVersionInput = {
  contentUrl: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fileId: Scalars['UUID']['input'];
  size: Scalars['Long']['input'];
};

export type CreateFolderInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreatePermissionInput = {
  allowed: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  for?: InputMaybe<PermissionType>;
  inherited?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type File = {
  __typename?: 'File';
  contentUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  currentVersion: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expiry?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['UUID']['output']>;
  pathName: Scalars['String']['output'];
  size: Scalars['Long']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  versionHistory: Array<FileVersion>;
};

export type FileFilterInput = {
  and?: InputMaybe<Array<FileFilterInput>>;
  contentUrl?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  currentVersion?: InputMaybe<IntOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  expiry?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  mimeType?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<FileFilterInput>>;
  parentId?: InputMaybe<UuidOperationFilterInput>;
  pathName?: InputMaybe<StringOperationFilterInput>;
  size?: InputMaybe<LongOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  versionHistory?: InputMaybe<ListFilterInputTypeOfFileVersionFilterInput>;
};

export type FilePermission = {
  __typename?: 'FilePermission';
  appliesToUser: Scalars['Boolean']['output'];
  assignments: Array<FilePermissionAssignment>;
  createdAt: Scalars['DateTime']['output'];
  file: File;
  fileId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isAllowed: Scalars['Boolean']['output'];
  isInheritable: Scalars['Boolean']['output'];
  isInherited: Scalars['Boolean']['output'];
  permission: Permission;
  permissionId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type FilePermissionAppliesToUserArgs = {
  user: UserInput;
};

export type FilePermissionAssignment = {
  __typename?: 'FilePermissionAssignment';
  assignedEntityType: Scalars['String']['output'];
  assignedToId: Scalars['UUID']['output'];
  assignmentType: AssignmentType;
  createdAt: Scalars['DateTime']['output'];
  filePermission: FilePermission;
  filePermissionId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FilePermissionAssignmentFilterInput = {
  and?: InputMaybe<Array<FilePermissionAssignmentFilterInput>>;
  assignedToId?: InputMaybe<UuidOperationFilterInput>;
  assignmentType?: InputMaybe<AssignmentTypeOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  filePermission?: InputMaybe<FilePermissionFilterInput>;
  filePermissionId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<FilePermissionAssignmentFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FilePermissionAssignmentSortInput = {
  assignedToId?: InputMaybe<SortEnumType>;
  assignmentType?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  filePermission?: InputMaybe<FilePermissionSortInput>;
  filePermissionId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type FilePermissionFilterInput = {
  and?: InputMaybe<Array<FilePermissionFilterInput>>;
  assignments?: InputMaybe<ListFilterInputTypeOfFilePermissionAssignmentFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  file?: InputMaybe<FileFilterInput>;
  fileId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isAllowed?: InputMaybe<BooleanOperationFilterInput>;
  isInheritable?: InputMaybe<BooleanOperationFilterInput>;
  isInherited?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FilePermissionFilterInput>>;
  permission?: InputMaybe<PermissionFilterInput>;
  permissionId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FilePermissionSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  file?: InputMaybe<FileSortInput>;
  fileId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAllowed?: InputMaybe<SortEnumType>;
  isInheritable?: InputMaybe<SortEnumType>;
  isInherited?: InputMaybe<SortEnumType>;
  permission?: InputMaybe<PermissionSortInput>;
  permissionId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type FileSortInput = {
  contentUrl?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  currentVersion?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  expiry?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  mimeType?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  pathName?: InputMaybe<SortEnumType>;
  size?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type FileVersion = {
  __typename?: 'FileVersion';
  contentUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  file: File;
  fileId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  size: Scalars['Long']['output'];
  versionNumber: Scalars['Int']['output'];
};

export type FileVersionFilterInput = {
  and?: InputMaybe<Array<FileVersionFilterInput>>;
  contentUrl?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  file?: InputMaybe<FileFilterInput>;
  fileId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<FileVersionFilterInput>>;
  size?: InputMaybe<LongOperationFilterInput>;
  versionNumber?: InputMaybe<IntOperationFilterInput>;
};

export type Folder = {
  __typename?: 'Folder';
  children: Array<ChildFolder>;
  createdAt: Scalars['DateTime']['output'];
  createdById: Scalars['UUID']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  files: Array<File>;
  id: Scalars['UUID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['UUID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FolderFilterInput = {
  and?: InputMaybe<Array<FolderFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  files?: InputMaybe<ListFilterInputTypeOfFileFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<FolderFilterInput>>;
  parentId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FolderPermission = {
  __typename?: 'FolderPermission';
  assignments: Array<FolderPermissionAssignment>;
  createdAt: Scalars['DateTime']['output'];
  folder: Folder;
  folderId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isAllowed: Scalars['Boolean']['output'];
  isInheritable: Scalars['Boolean']['output'];
  isInherited: Scalars['Boolean']['output'];
  permission: Permission;
  permissionId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FolderPermissionAssignment = {
  __typename?: 'FolderPermissionAssignment';
  assignedToId: Scalars['UUID']['output'];
  assignmentType: AssignmentType;
  createdAt: Scalars['DateTime']['output'];
  folderPermission: FolderPermission;
  folderPermissionId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FolderPermissionAssignmentFilterInput = {
  and?: InputMaybe<Array<FolderPermissionAssignmentFilterInput>>;
  assignedToId?: InputMaybe<UuidOperationFilterInput>;
  assignmentType?: InputMaybe<AssignmentTypeOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  folderPermission?: InputMaybe<FolderPermissionFilterInput>;
  folderPermissionId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<FolderPermissionAssignmentFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FolderPermissionAssignmentSortInput = {
  assignedToId?: InputMaybe<SortEnumType>;
  assignmentType?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  folderPermission?: InputMaybe<FolderPermissionSortInput>;
  folderPermissionId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type FolderPermissionFilterInput = {
  and?: InputMaybe<Array<FolderPermissionFilterInput>>;
  assignments?: InputMaybe<ListFilterInputTypeOfFolderPermissionAssignmentFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  folder?: InputMaybe<FolderFilterInput>;
  folderId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isAllowed?: InputMaybe<BooleanOperationFilterInput>;
  isInheritable?: InputMaybe<BooleanOperationFilterInput>;
  isInherited?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FolderPermissionFilterInput>>;
  permission?: InputMaybe<PermissionFilterInput>;
  permissionId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FolderPermissionSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  folder?: InputMaybe<FolderSortInput>;
  folderId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAllowed?: InputMaybe<SortEnumType>;
  isInheritable?: InputMaybe<SortEnumType>;
  isInherited?: InputMaybe<SortEnumType>;
  permission?: InputMaybe<PermissionSortInput>;
  permissionId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type FolderSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type ListFilterInputTypeOfFileFilterInput = {
  all?: InputMaybe<FileFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FileFilterInput>;
  some?: InputMaybe<FileFilterInput>;
};

export type ListFilterInputTypeOfFilePermissionAssignmentFilterInput = {
  all?: InputMaybe<FilePermissionAssignmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FilePermissionAssignmentFilterInput>;
  some?: InputMaybe<FilePermissionAssignmentFilterInput>;
};

export type ListFilterInputTypeOfFileVersionFilterInput = {
  all?: InputMaybe<FileVersionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FileVersionFilterInput>;
  some?: InputMaybe<FileVersionFilterInput>;
};

export type ListFilterInputTypeOfFolderPermissionAssignmentFilterInput = {
  all?: InputMaybe<FolderPermissionAssignmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FolderPermissionAssignmentFilterInput>;
  some?: InputMaybe<FolderPermissionAssignmentFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type LongOperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
  ngt?: InputMaybe<Scalars['Long']['input']>;
  ngte?: InputMaybe<Scalars['Long']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  nlt?: InputMaybe<Scalars['Long']['input']>;
  nlte?: InputMaybe<Scalars['Long']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignPermissionToEntity?: Maybe<FilePermissionAssignment>;
  assignPermissionToFile?: Maybe<FilePermission>;
  assignPermissionToFolder?: Maybe<FolderPermission>;
  assignPermissionToFolderEntity?: Maybe<FolderPermissionAssignment>;
  createFile?: Maybe<File>;
  createFileVersion?: Maybe<FileVersion>;
  createFolder?: Maybe<Folder>;
  createPermission?: Maybe<Permission>;
  deleteFile: Scalars['Boolean']['output'];
  deleteFolder: Scalars['Boolean']['output'];
  deletePermission: Scalars['Boolean']['output'];
  removeFolderPermissionAssignment: Scalars['Boolean']['output'];
  removeFolderPermissionAssignmentByEntity: Scalars['Boolean']['output'];
  removePermissionAssignment: Scalars['Boolean']['output'];
  removePermissionFromFile: Scalars['Boolean']['output'];
  removePermissionFromFolder: Scalars['Boolean']['output'];
  restoreFile: Scalars['Boolean']['output'];
  restoreFolder: Scalars['Boolean']['output'];
  updateFile?: Maybe<File>;
  updateFolder?: Maybe<Folder>;
  updatePermission?: Maybe<Permission>;
};


export type MutationAssignPermissionToEntityArgs = {
  input: AssignPermissionToEntityInput;
};


export type MutationAssignPermissionToFileArgs = {
  input: AssignPermissionToFileInput;
};


export type MutationAssignPermissionToFolderArgs = {
  input: AssignPermissionToFolderInput;
};


export type MutationAssignPermissionToFolderEntityArgs = {
  input: AssignPermissionToFolderEntityInput;
};


export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


export type MutationCreateFileVersionArgs = {
  input: CreateFileVersionInput;
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
};


export type MutationCreatePermissionArgs = {
  input: CreatePermissionInput;
};


export type MutationDeleteFileArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteFolderArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveFolderPermissionAssignmentArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemoveFolderPermissionAssignmentByEntityArgs = {
  input: RemoveFolderPermissionAssignmentInput;
};


export type MutationRemovePermissionAssignmentArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRemovePermissionFromFileArgs = {
  input: RemovePermissionFromFileInput;
};


export type MutationRemovePermissionFromFolderArgs = {
  input: RemovePermissionFromFolderInput;
};


export type MutationRestoreFileArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRestoreFolderArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationUpdateFileArgs = {
  input: UpdateFileInput;
};


export type MutationUpdateFolderArgs = {
  input: UpdateFolderInput;
};


export type MutationUpdatePermissionArgs = {
  input: UpdatePermissionInput;
};

export type NullableOfPermissionTypeOperationFilterInput = {
  eq?: InputMaybe<PermissionType>;
  in?: InputMaybe<Array<InputMaybe<PermissionType>>>;
  neq?: InputMaybe<PermissionType>;
  nin?: InputMaybe<Array<InputMaybe<PermissionType>>>;
};

export type Permission = {
  __typename?: 'Permission';
  _For?: Maybe<PermissionType>;
  allowed: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  inherited: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PermissionFilterInput = {
  _For?: InputMaybe<NullableOfPermissionTypeOperationFilterInput>;
  allowed?: InputMaybe<ListStringOperationFilterInput>;
  and?: InputMaybe<Array<PermissionFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  inherited?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PermissionFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type PermissionSortInput = {
  _For?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  inherited?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export enum PermissionType {
  File = 'FILE',
  Folder = 'FOLDER'
}

export type Query = {
  __typename?: 'Query';
  fileById?: Maybe<File>;
  filePermissionAssignmentById?: Maybe<FilePermissionAssignment>;
  filePermissionAssignments: Array<FilePermissionAssignment>;
  filePermissions: Array<FilePermission>;
  fileVersionHistory: Array<FileVersion>;
  files: Array<File>;
  filesByFolderId: Array<File>;
  folderById?: Maybe<Folder>;
  folderPermissionAssignmentById?: Maybe<FolderPermissionAssignment>;
  folderPermissionAssignments: Array<FolderPermissionAssignment>;
  folderPermissionAssignmentsByAssignedToId: Array<FolderPermissionAssignment>;
  folderPermissions: Array<FolderPermission>;
  folders: Array<Folder>;
  permissionAssignees: Array<AssigneeInfo>;
  permissionById?: Maybe<Permission>;
  permissions: Array<Permission>;
  permissionsByType: Array<Permission>;
};


export type QueryFileByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFilePermissionAssignmentByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFilePermissionAssignmentsArgs = {
  filePermissionId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FilePermissionAssignmentSortInput>>;
  where?: InputMaybe<FilePermissionAssignmentFilterInput>;
};


export type QueryFilePermissionsArgs = {
  fileId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FilePermissionSortInput>>;
  where?: InputMaybe<FilePermissionFilterInput>;
};


export type QueryFileVersionHistoryArgs = {
  fileId: Scalars['UUID']['input'];
};


export type QueryFilesArgs = {
  order?: InputMaybe<Array<FileSortInput>>;
  where?: InputMaybe<FileFilterInput>;
};


export type QueryFilesByFolderIdArgs = {
  folderId: Scalars['UUID']['input'];
};


export type QueryFolderByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFolderPermissionAssignmentByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFolderPermissionAssignmentsArgs = {
  folderPermissionId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FolderPermissionAssignmentSortInput>>;
  where?: InputMaybe<FolderPermissionAssignmentFilterInput>;
};


export type QueryFolderPermissionAssignmentsByAssignedToIdArgs = {
  assignedToId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FolderPermissionAssignmentSortInput>>;
  where?: InputMaybe<FolderPermissionAssignmentFilterInput>;
};


export type QueryFolderPermissionsArgs = {
  folderId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FolderPermissionSortInput>>;
  where?: InputMaybe<FolderPermissionFilterInput>;
};


export type QueryFoldersArgs = {
  order?: InputMaybe<Array<FolderSortInput>>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  where?: InputMaybe<FolderFilterInput>;
};


export type QueryPermissionAssigneesArgs = {
  where?: InputMaybe<AssigneeInfoFilterInput>;
};


export type QueryPermissionByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryPermissionsArgs = {
  order?: InputMaybe<Array<PermissionSortInput>>;
  where?: InputMaybe<PermissionFilterInput>;
};


export type QueryPermissionsByTypeArgs = {
  permissionType: PermissionType;
};

export type RemoveFolderPermissionAssignmentInput = {
  assignedToId: Scalars['UUID']['input'];
  assignmentType: AssignmentType;
  folderId: Scalars['UUID']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type RemovePermissionFromFileInput = {
  fileId: Scalars['UUID']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type RemovePermissionFromFolderInput = {
  folderId: Scalars['UUID']['input'];
  permissionId: Scalars['UUID']['input'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFileInput = {
  contentUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expiry?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Long']['input']>;
  versionDescription?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFolderInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePermissionInput = {
  allowed?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  for?: InputMaybe<PermissionType>;
  id: Scalars['UUID']['input'];
  inherited?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UserInput = {
  createdAt: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  emailVerificationToken?: InputMaybe<Scalars['String']['input']>;
  emailVerificationTokenExpires?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
  isEmailVerified: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  passwordResetToken?: InputMaybe<Scalars['String']['input']>;
  passwordResetTokenExpires?: InputMaybe<Scalars['DateTime']['input']>;
  roleId: Scalars['UUID']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateFileMutationVariables = Exact<{
  input: CreateFileInput;
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile?: { __typename?: 'File', id: any, name: string, pathName: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number } | null };

export type UpdateFileMutationVariables = Exact<{
  input: UpdateFileInput;
}>;


export type UpdateFileMutation = { __typename?: 'Mutation', updateFile?: { __typename?: 'File', id: any, name: string, pathName: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number } | null };

export type DeleteFileMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile: boolean };

export type RestoreFileMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RestoreFileMutation = { __typename?: 'Mutation', restoreFile: boolean };

export type CreateFileVersionMutationVariables = Exact<{
  input: CreateFileVersionInput;
}>;


export type CreateFileVersionMutation = { __typename?: 'Mutation', createFileVersion?: { __typename?: 'FileVersion', id: any, versionNumber: number, description?: string | null, size: any, createdAt: any } | null };

export type CreateFolderMutationVariables = Exact<{
  input: CreateFolderInput;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder?: { __typename?: 'Folder', id: any, name: string, description?: string | null, parentId?: any | null, createdAt: any } | null };

export type UpdateFolderMutationVariables = Exact<{
  input: UpdateFolderInput;
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', updateFolder?: { __typename?: 'Folder', id: any, name: string, description?: string | null, parentId?: any | null, createdAt: any } | null };

export type DeleteFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', deleteFolder: boolean };

export type RestoreFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RestoreFolderMutation = { __typename?: 'Mutation', restoreFolder: boolean };

export type CreateAccessMutationVariables = Exact<{
  AssignPermissionToFolderEntityInput: AssignPermissionToFolderEntityInput;
}>;


export type CreateAccessMutation = { __typename?: 'Mutation', assignPermissionToFolderEntity?: { __typename?: 'FolderPermissionAssignment', id: any, assignedToId: any, assignmentType: AssignmentType } | null };

export type RemoveAccessMutationVariables = Exact<{
  RemoveFolderPermissionAssignmentInput: RemoveFolderPermissionAssignmentInput;
}>;


export type RemoveAccessMutation = { __typename?: 'Mutation', removeFolderPermissionAssignmentByEntity: boolean };

export type GetFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', id: any, name: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdById: any, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number }> };

export type GetFileByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFileByIdQuery = { __typename?: 'Query', fileById?: { __typename?: 'File', id: any, name: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdById: any, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number } | null };

export type GetFilesByFolderIdQueryVariables = Exact<{
  folderId: Scalars['UUID']['input'];
}>;


export type GetFilesByFolderIdQuery = { __typename?: 'Query', filesByFolderId: Array<{ __typename?: 'File', id: any, name: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdById: any, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number }> };

export type GetFileVersionHistoryQueryVariables = Exact<{
  fileId: Scalars['UUID']['input'];
}>;


export type GetFileVersionHistoryQuery = { __typename?: 'Query', fileVersionHistory: Array<{ __typename?: 'FileVersion', id: any, versionNumber: number, description?: string | null, size: any, createdById: any, createdAt: any }> };

export type GetFoldersQueryVariables = Exact<{
  parentId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetFoldersQuery = { __typename?: 'Query', folders: Array<{ __typename?: 'Folder', id: any, name: string, description?: string | null, parentId?: any | null, createdById: any, createdAt: any, updatedAt?: any | null }> };

export type GetFolderByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFolderByIdQuery = { __typename?: 'Query', folderById?: { __typename?: 'Folder', id: any, name: string, description?: string | null, parentId?: any | null, createdById: any, createdAt: any, updatedAt?: any | null } | null };

export type PermissionAssigneesQueryVariables = Exact<{
  AssigneeInfoFilterInput?: InputMaybe<AssigneeInfoFilterInput>;
}>;


export type PermissionAssigneesQuery = { __typename?: 'Query', permissionAssignees: Array<{ __typename?: 'AssigneeInfo', id: any, name: string, type: AssignmentType, description?: string | null }> };

export type AssignedPermissionQueryVariables = Exact<{
  assignedToId: Scalars['UUID']['input'];
}>;


export type AssignedPermissionQuery = { __typename?: 'Query', folderPermissionAssignmentsByAssignedToId: Array<{ __typename?: 'FolderPermissionAssignment', id: any, assignedToId: any, assignmentType: AssignmentType, folderPermission: { __typename?: 'FolderPermission', folderId: any, permissionId: any } }> };

export type PermissionListQueryVariables = Exact<{ [key: string]: never; }>;


export type PermissionListQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', id: any, name: string, _For?: PermissionType | null, allowed: Array<string> }> };


export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pathName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const UpdateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pathName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<UpdateFileMutation, UpdateFileMutationVariables>;
export const DeleteFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const RestoreFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RestoreFileMutation, RestoreFileMutationVariables>;
export const CreateFileVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFileVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileVersionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFileVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"versionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFileVersionMutation, CreateFileVersionMutationVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const UpdateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const DeleteFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const RestoreFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RestoreFolderMutation, RestoreFolderMutationVariables>;
export const CreateAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"AssignPermissionToFolderEntityInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignPermissionToFolderEntityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignPermissionToFolderEntity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"AssignPermissionToFolderEntityInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"assignmentType"}}]}}]}}]} as unknown as DocumentNode<CreateAccessMutation, CreateAccessMutationVariables>;
export const RemoveAccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"RemoveFolderPermissionAssignmentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveFolderPermissionAssignmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFolderPermissionAssignmentByEntity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"RemoveFolderPermissionAssignmentInput"}}}]}]}}]} as unknown as DocumentNode<RemoveAccessMutation, RemoveAccessMutationVariables>;
export const GetFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<GetFilesQuery, GetFilesQueryVariables>;
export const GetFileByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<GetFileByIdQuery, GetFileByIdQueryVariables>;
export const GetFilesByFolderIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilesByFolderId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filesByFolderId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<GetFilesByFolderIdQuery, GetFilesByFolderIdQueryVariables>;
export const GetFileVersionHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileVersionHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileVersionHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"versionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFileVersionHistoryQuery, GetFileVersionHistoryQueryVariables>;
export const GetFoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFoldersQuery, GetFoldersQueryVariables>;
export const GetFolderByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolderById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFolderByIdQuery, GetFolderByIdQueryVariables>;
export const PermissionAssigneesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PermissionAssignees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"AssigneeInfoFilterInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssigneeInfoFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionAssignees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"AssigneeInfoFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<PermissionAssigneesQuery, PermissionAssigneesQueryVariables>;
export const AssignedPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssignedPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedToId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderPermissionAssignmentsByAssignedToId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assignedToId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedToId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"folderPermission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderId"}},{"kind":"Field","name":{"kind":"Name","value":"permissionId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"assignmentType"}}]}}]}}]} as unknown as DocumentNode<AssignedPermissionQuery, AssignedPermissionQueryVariables>;
export const PermissionListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PermissionList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_For"}},{"kind":"Field","name":{"kind":"Name","value":"allowed"}}]}}]}}]} as unknown as DocumentNode<PermissionListQuery, PermissionListQueryVariables>;