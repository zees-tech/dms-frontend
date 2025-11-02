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
  /** The `TimeSpan` scalar represents an ISO-8601 compliant duration type. */
  TimeSpan: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type ActivityTrend = {
  __typename?: 'ActivityTrend';
  fileDownloads: Scalars['Int']['output'];
  fileUploads: Scalars['Int']['output'];
  folderCreations: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  periodEnd: Scalars['DateTime']['output'];
  periodStart: Scalars['DateTime']['output'];
  periodType: Scalars['String']['output'];
  permissionChanges: Scalars['Int']['output'];
  totalActivities: Scalars['Int']['output'];
};

export type ActivityTrendFilterInput = {
  and?: InputMaybe<Array<ActivityTrendFilterInput>>;
  fileDownloads?: InputMaybe<IntOperationFilterInput>;
  fileUploads?: InputMaybe<IntOperationFilterInput>;
  folderCreations?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ActivityTrendFilterInput>>;
  period?: InputMaybe<StringOperationFilterInput>;
  periodEnd?: InputMaybe<DateTimeOperationFilterInput>;
  periodStart?: InputMaybe<DateTimeOperationFilterInput>;
  periodType?: InputMaybe<StringOperationFilterInput>;
  permissionChanges?: InputMaybe<IntOperationFilterInput>;
  totalActivities?: InputMaybe<IntOperationFilterInput>;
};

export type AddUserToGroupInput = {
  groupId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type AddWorkflowStepInput = {
  assignedToId: Scalars['UUID']['input'];
  canDelegate?: Scalars['Boolean']['input'];
  completionActionConfig?: InputMaybe<Scalars['String']['input']>;
  conditionExpression?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isRequired?: Scalars['Boolean']['input'];
  rejectionActionConfig?: InputMaybe<Scalars['String']['input']>;
  stepName: Scalars['String']['input'];
  stepNumber: Scalars['Int']['input'];
  timeoutHours?: InputMaybe<Scalars['Int']['input']>;
  workflowId: Scalars['UUID']['input'];
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

export type AssignPermissionToFileInput = {
  fileId: Scalars['UUID']['input'];
  isAllowed?: Scalars['Boolean']['input'];
  isInheritable?: Scalars['Boolean']['input'];
  isInherited?: Scalars['Boolean']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type AssignPermissionToFolderInput = {
  folderId: Scalars['UUID']['input'];
  isAllowed?: Scalars['Boolean']['input'];
  isInheritable?: Scalars['Boolean']['input'];
  isInherited?: Scalars['Boolean']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type AssignRoleInput = {
  roleId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type AssignToDepartmentInput = {
  departmentId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type AssigneeInfo = {
  __typename?: 'AssigneeInfo';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  type: GroupType;
};

export type AssigneeInfoFilterInput = {
  and?: InputMaybe<Array<AssigneeInfoFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AssigneeInfoFilterInput>>;
  type?: InputMaybe<GroupTypeOperationFilterInput>;
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

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type CreateDepartmentInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentDepartmentId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateDynamicPermissionRuleInput = {
  childRules?: InputMaybe<Array<CreateDynamicPermissionRuleInput>>;
  conditionType: RuleConditionType;
  description?: InputMaybe<Scalars['String']['input']>;
  field: Scalars['String']['input'];
  folderPermissionId?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: Scalars['Boolean']['input'];
  isAllowed?: Scalars['Boolean']['input'];
  isInheritable?: Scalars['Boolean']['input'];
  isInherited?: Scalars['Boolean']['input'];
  logicalOperator?: LogicalOperator;
  name: Scalars['String']['input'];
  operator: RuleOperator;
  parentRuleId?: InputMaybe<Scalars['UUID']['input']>;
  priority?: Scalars['Int']['input'];
  requestPermissionId?: InputMaybe<Scalars['UUID']['input']>;
  ruleType?: RuleType;
  userGroupId: Scalars['UUID']['input'];
  value: Scalars['String']['input'];
  workflowPermissionId?: InputMaybe<Scalars['UUID']['input']>;
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

export type CreateUserInput = {
  businessUnit?: InputMaybe<Scalars['String']['input']>;
  costCenter?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['UUID']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  employeeId?: InputMaybe<Scalars['String']['input']>;
  employmentType?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['DateTime']['input']>;
  jobTitleId?: InputMaybe<Scalars['UUID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  managerId?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleId: Scalars['UUID']['input'];
};

export type CreateWorkflowInput = {
  allowDelegation?: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isSequential?: Scalars['Boolean']['input'];
  isSystemDefault?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  requiredApprovals?: Scalars['Int']['input'];
  timeoutHours?: InputMaybe<Scalars['Int']['input']>;
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

export type Department = {
  __typename?: 'Department';
  code?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentDepartment?: Maybe<Department>;
  parentDepartmentId?: Maybe<Scalars['UUID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<User>;
};

export type DepartmentActivity = {
  __typename?: 'DepartmentActivity';
  activityCount: Scalars['Int']['output'];
  activityPerUser: Scalars['Float']['output'];
  departmentId: Scalars['UUID']['output'];
  departmentName: Scalars['String']['output'];
  fileUploads: Scalars['Int']['output'];
  storageUsed: Scalars['Long']['output'];
  userCount: Scalars['Int']['output'];
};

export type DepartmentActivityFilterInput = {
  activityCount?: InputMaybe<IntOperationFilterInput>;
  activityPerUser?: InputMaybe<FloatOperationFilterInput>;
  and?: InputMaybe<Array<DepartmentActivityFilterInput>>;
  departmentId?: InputMaybe<UuidOperationFilterInput>;
  departmentName?: InputMaybe<StringOperationFilterInput>;
  fileUploads?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<DepartmentActivityFilterInput>>;
  storageUsed?: InputMaybe<LongOperationFilterInput>;
  userCount?: InputMaybe<IntOperationFilterInput>;
};

export type DepartmentFilterInput = {
  and?: InputMaybe<Array<DepartmentFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DepartmentFilterInput>>;
  parentDepartment?: InputMaybe<DepartmentFilterInput>;
  parentDepartmentId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  users?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
};

export type DepartmentSortInput = {
  code?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  parentDepartment?: InputMaybe<DepartmentSortInput>;
  parentDepartmentId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type DepartmentStatistics = {
  __typename?: 'DepartmentStatistics';
  departmentsWithUsers: Scalars['Int']['output'];
  rootDepartments: Scalars['Int']['output'];
  totalDepartments: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type DepartmentsCollectionSegment = {
  __typename?: 'DepartmentsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Department>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type DynamicPermissionRule = {
  __typename?: 'DynamicPermissionRule';
  childRules: Array<DynamicPermissionRule>;
  conditionType: RuleConditionType;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  field: Scalars['String']['output'];
  folderPermission?: Maybe<FolderPermission>;
  folderPermissionId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAllowed: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isInheritable: Scalars['Boolean']['output'];
  isInherited: Scalars['Boolean']['output'];
  logicalOperator: LogicalOperator;
  name: Scalars['String']['output'];
  operator: RuleOperator;
  parentRule?: Maybe<DynamicPermissionRule>;
  parentRuleId?: Maybe<Scalars['UUID']['output']>;
  priority: Scalars['Int']['output'];
  requestPermission?: Maybe<WorkflowPermission>;
  requestPermissionId?: Maybe<Scalars['UUID']['output']>;
  ruleType: RuleType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userGroup: UserGroup;
  userGroupId: Scalars['UUID']['output'];
  value: Scalars['String']['output'];
  workflowPermission?: Maybe<WorkflowPermission>;
  workflowPermissionId?: Maybe<Scalars['UUID']['output']>;
};

export type File = {
  __typename?: 'File';
  contentUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  currentVersion: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expiry?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['UUID']['output']>;
  pathName: Scalars['String']['output'];
  size: Scalars['Long']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  versionHistory: Array<FileVersion>;
};

export type FileAnalytics = {
  __typename?: 'FileAnalytics';
  activeDocuments: Scalars['Int']['output'];
  activeDocumentsPercentage: Scalars['Float']['output'];
  approvedFiles: Scalars['Int']['output'];
  archivedDocuments: Scalars['Int']['output'];
  averageVersionsPerFile: Scalars['Float']['output'];
  expiredDocuments: Scalars['Int']['output'];
  expiringSoonDocuments: Scalars['Int']['output'];
  expiringSoonTimeframe: Scalars['String']['output'];
  fileTypeDistributions: Array<FileTypeDistribution>;
  filesAddedThisMonth: Scalars['Int']['output'];
  filesModifiedThisMonth: Scalars['Int']['output'];
  filesModifiedThisWeek: Scalars['Int']['output'];
  filesModifiedToday: Scalars['Int']['output'];
  inReviewFiles: Scalars['Int']['output'];
  rejectedFiles: Scalars['Int']['output'];
  topFilesBySize: Array<TopFileBySize>;
  totalFiles: Scalars['Int']['output'];
  totalFolders: Scalars['Int']['output'];
  totalVersions: Scalars['Int']['output'];
  uploadTrends: Array<UploadTrend>;
};

export type FileAnalyticsFilterInput = {
  activeDocuments?: InputMaybe<IntOperationFilterInput>;
  activeDocumentsPercentage?: InputMaybe<FloatOperationFilterInput>;
  and?: InputMaybe<Array<FileAnalyticsFilterInput>>;
  approvedFiles?: InputMaybe<IntOperationFilterInput>;
  archivedDocuments?: InputMaybe<IntOperationFilterInput>;
  averageVersionsPerFile?: InputMaybe<FloatOperationFilterInput>;
  expiredDocuments?: InputMaybe<IntOperationFilterInput>;
  expiringSoonDocuments?: InputMaybe<IntOperationFilterInput>;
  expiringSoonTimeframe?: InputMaybe<StringOperationFilterInput>;
  fileTypeDistributions?: InputMaybe<ListFilterInputTypeOfFileTypeDistributionFilterInput>;
  filesAddedThisMonth?: InputMaybe<IntOperationFilterInput>;
  filesModifiedThisMonth?: InputMaybe<IntOperationFilterInput>;
  filesModifiedThisWeek?: InputMaybe<IntOperationFilterInput>;
  filesModifiedToday?: InputMaybe<IntOperationFilterInput>;
  inReviewFiles?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<FileAnalyticsFilterInput>>;
  rejectedFiles?: InputMaybe<IntOperationFilterInput>;
  topFilesBySize?: InputMaybe<ListFilterInputTypeOfTopFileBySizeFilterInput>;
  totalFiles?: InputMaybe<IntOperationFilterInput>;
  totalFolders?: InputMaybe<IntOperationFilterInput>;
  totalVersions?: InputMaybe<IntOperationFilterInput>;
  uploadTrends?: InputMaybe<ListFilterInputTypeOfUploadTrendFilterInput>;
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
  isActive?: InputMaybe<BooleanOperationFilterInput>;
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
  assignments: Array<FilePermissionAssignment>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  file: File;
  fileId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAllowed: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isInheritable: Scalars['Boolean']['output'];
  isInherited: Scalars['Boolean']['output'];
  permission: Permission;
  permissionId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FilePermissionAssignment = {
  __typename?: 'FilePermissionAssignment';
  assignedEntityType: Scalars['String']['output'];
  assignedToId: Scalars['UUID']['output'];
  assignmentType: AssignmentType;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  filePermission: FilePermission;
  filePermissionId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FilePermissionAssignmentFilterInput = {
  and?: InputMaybe<Array<FilePermissionAssignmentFilterInput>>;
  assignedToId?: InputMaybe<UuidOperationFilterInput>;
  assignmentType?: InputMaybe<AssignmentTypeOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  filePermission?: InputMaybe<FilePermissionFilterInput>;
  filePermissionId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FilePermissionAssignmentFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FilePermissionFilterInput = {
  and?: InputMaybe<Array<FilePermissionFilterInput>>;
  assignments?: InputMaybe<ListFilterInputTypeOfFilePermissionAssignmentFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  file?: InputMaybe<FileFilterInput>;
  fileId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isAllowed?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isInheritable?: InputMaybe<BooleanOperationFilterInput>;
  isInherited?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FilePermissionFilterInput>>;
  permission?: InputMaybe<PermissionFilterInput>;
  permissionId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FilePermissionSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  file?: InputMaybe<FileSortInput>;
  fileId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isAllowed?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isInheritable?: InputMaybe<SortEnumType>;
  isInherited?: InputMaybe<SortEnumType>;
  permission?: InputMaybe<PermissionSortInput>;
  permissionId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type FilePermissionsCollectionSegment = {
  __typename?: 'FilePermissionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<FilePermission>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FileSizeDistribution = {
  __typename?: 'FileSizeDistribution';
  averageSize: Scalars['Float']['output'];
  fileCount: Scalars['Int']['output'];
  maxSize: Scalars['Long']['output'];
  minSize: Scalars['Long']['output'];
  percentage: Scalars['Float']['output'];
  rangeLabel: Scalars['String']['output'];
  sizeRange: Scalars['String']['output'];
  totalSize: Scalars['Long']['output'];
};

export type FileSizeDistributionFilterInput = {
  and?: InputMaybe<Array<FileSizeDistributionFilterInput>>;
  averageSize?: InputMaybe<FloatOperationFilterInput>;
  fileCount?: InputMaybe<IntOperationFilterInput>;
  maxSize?: InputMaybe<LongOperationFilterInput>;
  minSize?: InputMaybe<LongOperationFilterInput>;
  or?: InputMaybe<Array<FileSizeDistributionFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
  rangeLabel?: InputMaybe<StringOperationFilterInput>;
  sizeRange?: InputMaybe<StringOperationFilterInput>;
  totalSize?: InputMaybe<LongOperationFilterInput>;
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
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  mimeType?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  pathName?: InputMaybe<SortEnumType>;
  size?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type FileTypeDistribution = {
  __typename?: 'FileTypeDistribution';
  fileCount: Scalars['Int']['output'];
  mimeType: Scalars['String']['output'];
  percentage: Scalars['Float']['output'];
  totalSize: Scalars['Long']['output'];
  typeCategory: Scalars['String']['output'];
};

export type FileTypeDistributionFilterInput = {
  and?: InputMaybe<Array<FileTypeDistributionFilterInput>>;
  fileCount?: InputMaybe<IntOperationFilterInput>;
  mimeType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<FileTypeDistributionFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
  totalSize?: InputMaybe<LongOperationFilterInput>;
  typeCategory?: InputMaybe<StringOperationFilterInput>;
};

export type FileVersion = {
  __typename?: 'FileVersion';
  contentUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  file: File;
  fileId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  size: Scalars['Long']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  versionNumber: Scalars['Int']['output'];
};

export type FileVersionFilterInput = {
  and?: InputMaybe<Array<FileVersionFilterInput>>;
  contentUrl?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  file?: InputMaybe<FileFilterInput>;
  fileId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FileVersionFilterInput>>;
  size?: InputMaybe<LongOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  versionNumber?: InputMaybe<IntOperationFilterInput>;
};

/** A segment of a collection. */
export type FilesCollectionSegment = {
  __typename?: 'FilesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<File>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  children: Array<ChildFolder>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  files: Array<File>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  ownerGroupId?: Maybe<Scalars['UUID']['output']>;
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
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<FolderFilterInput>>;
  ownerGroupId?: InputMaybe<UuidOperationFilterInput>;
  parentId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FolderPermission = {
  __typename?: 'FolderPermission';
  assignments: Array<FolderPermissionAssignment>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  folder: Folder;
  folderId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAllowed: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isInheritable: Scalars['Boolean']['output'];
  isInherited: Scalars['Boolean']['output'];
  permission: Permission;
  permissionId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FolderPermissionAssignment = {
  __typename?: 'FolderPermissionAssignment';
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  folder: Folder;
  folderId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  permission: Permission;
  permissionId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId: Scalars['UUID']['output'];
};

export type FolderPermissionAssignmentFilterInput = {
  and?: InputMaybe<Array<FolderPermissionAssignmentFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  folder?: InputMaybe<FolderFilterInput>;
  folderId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FolderPermissionAssignmentFilterInput>>;
  permission?: InputMaybe<PermissionFilterInput>;
  permissionId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

export type FolderPermissionFilterInput = {
  and?: InputMaybe<Array<FolderPermissionFilterInput>>;
  assignments?: InputMaybe<ListFilterInputTypeOfFolderPermissionAssignmentFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  folder?: InputMaybe<FolderFilterInput>;
  folderId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isAllowed?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isInheritable?: InputMaybe<BooleanOperationFilterInput>;
  isInherited?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FolderPermissionFilterInput>>;
  permission?: InputMaybe<PermissionFilterInput>;
  permissionId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type FolderPermissionSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  folder?: InputMaybe<FolderSortInput>;
  folderId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isAllowed?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isInheritable?: InputMaybe<SortEnumType>;
  isInherited?: InputMaybe<SortEnumType>;
  permission?: InputMaybe<PermissionSortInput>;
  permissionId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type FolderPermissionsCollectionSegment = {
  __typename?: 'FolderPermissionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<FolderPermission>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type FolderSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ownerGroupId?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type FoldersCollectionSegment = {
  __typename?: 'FoldersCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Folder>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export enum GroupType {
  Department = 'DEPARTMENT',
  File = 'FILE',
  Folder = 'FOLDER',
  Group = 'GROUP',
  Request = 'REQUEST',
  Role = 'ROLE',
  Team = 'TEAM',
  UserType = 'USER_TYPE'
}

export type GroupTypeOperationFilterInput = {
  eq?: InputMaybe<GroupType>;
  in?: InputMaybe<Array<GroupType>>;
  neq?: InputMaybe<GroupType>;
  nin?: InputMaybe<Array<GroupType>>;
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

export type JobTitle = {
  __typename?: 'JobTitle';
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type JobTitleFilterInput = {
  and?: InputMaybe<Array<JobTitleFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  department?: InputMaybe<DepartmentFilterInput>;
  departmentId?: InputMaybe<UuidOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<JobTitleFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type JobTitleSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  department?: InputMaybe<DepartmentSortInput>;
  departmentId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type KeyValuePairOfStringAndInt32 = {
  __typename?: 'KeyValuePairOfStringAndInt32';
  key: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type ListFilterInputTypeOfActivityTrendFilterInput = {
  all?: InputMaybe<ActivityTrendFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ActivityTrendFilterInput>;
  some?: InputMaybe<ActivityTrendFilterInput>;
};

export type ListFilterInputTypeOfDepartmentActivityFilterInput = {
  all?: InputMaybe<DepartmentActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<DepartmentActivityFilterInput>;
  some?: InputMaybe<DepartmentActivityFilterInput>;
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

export type ListFilterInputTypeOfFileSizeDistributionFilterInput = {
  all?: InputMaybe<FileSizeDistributionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FileSizeDistributionFilterInput>;
  some?: InputMaybe<FileSizeDistributionFilterInput>;
};

export type ListFilterInputTypeOfFileTypeDistributionFilterInput = {
  all?: InputMaybe<FileTypeDistributionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<FileTypeDistributionFilterInput>;
  some?: InputMaybe<FileTypeDistributionFilterInput>;
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

export type ListFilterInputTypeOfLoginTrendFilterInput = {
  all?: InputMaybe<LoginTrendFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<LoginTrendFilterInput>;
  some?: InputMaybe<LoginTrendFilterInput>;
};

export type ListFilterInputTypeOfMostActiveUserFilterInput = {
  all?: InputMaybe<MostActiveUserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<MostActiveUserFilterInput>;
  some?: InputMaybe<MostActiveUserFilterInput>;
};

export type ListFilterInputTypeOfPendingRequestByAgeFilterInput = {
  all?: InputMaybe<PendingRequestByAgeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<PendingRequestByAgeFilterInput>;
  some?: InputMaybe<PendingRequestByAgeFilterInput>;
};

export type ListFilterInputTypeOfRecentActivityFilterInput = {
  all?: InputMaybe<RecentActivityFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RecentActivityFilterInput>;
  some?: InputMaybe<RecentActivityFilterInput>;
};

export type ListFilterInputTypeOfRequestStepFilterInput = {
  all?: InputMaybe<RequestStepFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RequestStepFilterInput>;
  some?: InputMaybe<RequestStepFilterInput>;
};

export type ListFilterInputTypeOfRequestTrendFilterInput = {
  all?: InputMaybe<RequestTrendFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<RequestTrendFilterInput>;
  some?: InputMaybe<RequestTrendFilterInput>;
};

export type ListFilterInputTypeOfStepPerformanceFilterInput = {
  all?: InputMaybe<StepPerformanceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StepPerformanceFilterInput>;
  some?: InputMaybe<StepPerformanceFilterInput>;
};

export type ListFilterInputTypeOfStorageByDepartmentFilterInput = {
  all?: InputMaybe<StorageByDepartmentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StorageByDepartmentFilterInput>;
  some?: InputMaybe<StorageByDepartmentFilterInput>;
};

export type ListFilterInputTypeOfStorageByTypeFilterInput = {
  all?: InputMaybe<StorageByTypeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StorageByTypeFilterInput>;
  some?: InputMaybe<StorageByTypeFilterInput>;
};

export type ListFilterInputTypeOfStorageByUserFilterInput = {
  all?: InputMaybe<StorageByUserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StorageByUserFilterInput>;
  some?: InputMaybe<StorageByUserFilterInput>;
};

export type ListFilterInputTypeOfStorageGrowthTrendFilterInput = {
  all?: InputMaybe<StorageGrowthTrendFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StorageGrowthTrendFilterInput>;
  some?: InputMaybe<StorageGrowthTrendFilterInput>;
};

export type ListFilterInputTypeOfTopApproverFilterInput = {
  all?: InputMaybe<TopApproverFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopApproverFilterInput>;
  some?: InputMaybe<TopApproverFilterInput>;
};

export type ListFilterInputTypeOfTopFileBySizeFilterInput = {
  all?: InputMaybe<TopFileBySizeFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<TopFileBySizeFilterInput>;
  some?: InputMaybe<TopFileBySizeFilterInput>;
};

export type ListFilterInputTypeOfUploadTrendFilterInput = {
  all?: InputMaybe<UploadTrendFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UploadTrendFilterInput>;
  some?: InputMaybe<UploadTrendFilterInput>;
};

export type ListFilterInputTypeOfUserFilterInput = {
  all?: InputMaybe<UserFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<UserFilterInput>;
  some?: InputMaybe<UserFilterInput>;
};

export type ListFilterInputTypeOfWorkflowPerformanceFilterInput = {
  all?: InputMaybe<WorkflowPerformanceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<WorkflowPerformanceFilterInput>;
  some?: InputMaybe<WorkflowPerformanceFilterInput>;
};

export type ListFilterInputTypeOfWorkflowStepFilterInput = {
  all?: InputMaybe<WorkflowStepFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<WorkflowStepFilterInput>;
  some?: InputMaybe<WorkflowStepFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type LoginTrend = {
  __typename?: 'LoginTrend';
  loginCount: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  periodEnd: Scalars['DateTime']['output'];
  periodStart: Scalars['DateTime']['output'];
  periodType: Scalars['String']['output'];
  uniqueUsers: Scalars['Int']['output'];
};

export type LoginTrendFilterInput = {
  and?: InputMaybe<Array<LoginTrendFilterInput>>;
  loginCount?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LoginTrendFilterInput>>;
  period?: InputMaybe<StringOperationFilterInput>;
  periodEnd?: InputMaybe<DateTimeOperationFilterInput>;
  periodStart?: InputMaybe<DateTimeOperationFilterInput>;
  periodType?: InputMaybe<StringOperationFilterInput>;
  uniqueUsers?: InputMaybe<IntOperationFilterInput>;
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

export type MostActiveUser = {
  __typename?: 'MostActiveUser';
  activityCount: Scalars['Int']['output'];
  departmentName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fileDownloads: Scalars['Int']['output'];
  fileUploads: Scalars['Int']['output'];
  folderCreations: Scalars['Int']['output'];
  lastActivity: Scalars['DateTime']['output'];
  roleName: Scalars['String']['output'];
  userId: Scalars['UUID']['output'];
  userName: Scalars['String']['output'];
};

export type MostActiveUserFilterInput = {
  activityCount?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<MostActiveUserFilterInput>>;
  departmentName?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  fileDownloads?: InputMaybe<IntOperationFilterInput>;
  fileUploads?: InputMaybe<IntOperationFilterInput>;
  folderCreations?: InputMaybe<IntOperationFilterInput>;
  lastActivity?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<MostActiveUserFilterInput>>;
  roleName?: InputMaybe<StringOperationFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateDepartment: Scalars['Boolean']['output'];
  activateUser: Scalars['Boolean']['output'];
  activateWorkflow: Scalars['Boolean']['output'];
  addUserToGroup: Scalars['Boolean']['output'];
  addWorkflowStep?: Maybe<WorkflowStep>;
  assignPermissionToFile?: Maybe<FilePermission>;
  assignPermissionToFolder?: Maybe<FolderPermission>;
  assignRole: Scalars['Boolean']['output'];
  assignToDepartment: Scalars['Boolean']['output'];
  createDepartment: Department;
  createDynamicPermissionRule?: Maybe<DynamicPermissionRule>;
  createFile?: Maybe<File>;
  createFileVersion?: Maybe<FileVersion>;
  createFolder?: Maybe<Folder>;
  createPermission?: Maybe<Permission>;
  createUser?: Maybe<User>;
  createWorkflow?: Maybe<Workflow>;
  deactivateDepartment: Scalars['Boolean']['output'];
  deactivateUser: Scalars['Boolean']['output'];
  deactivateWorkflow: Scalars['Boolean']['output'];
  deleteDepartment: Scalars['Boolean']['output'];
  deleteFile: Scalars['Boolean']['output'];
  deleteFolder: Scalars['Boolean']['output'];
  deleteNotification: Scalars['Boolean']['output'];
  deletePermission: Scalars['Boolean']['output'];
  deleteWorkflow: Scalars['Boolean']['output'];
  deleteWorkflowStep: Scalars['Boolean']['output'];
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markNotificationAsRead?: Maybe<Notification>;
  processRequest?: Maybe<Request>;
  removePermissionFromFile: Scalars['Boolean']['output'];
  removePermissionFromFolder: Scalars['Boolean']['output'];
  removeUserFromGroup: Scalars['Boolean']['output'];
  restoreFile: Scalars['Boolean']['output'];
  restoreFolder: Scalars['Boolean']['output'];
  setDefaultWorkflow: Scalars['Boolean']['output'];
  setManager: Scalars['Boolean']['output'];
  updateDepartment: Department;
  updateFile?: Maybe<File>;
  updateFolder?: Maybe<Folder>;
  updatePermission?: Maybe<Permission>;
  updateUser?: Maybe<User>;
  updateUserProfile?: Maybe<User>;
  updateWorkflow?: Maybe<Workflow>;
  updateWorkflowStep?: Maybe<WorkflowStep>;
};


export type MutationActivateDepartmentArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationActivateUserArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationActivateWorkflowArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationAddUserToGroupArgs = {
  input: AddUserToGroupInput;
};


export type MutationAddWorkflowStepArgs = {
  input: AddWorkflowStepInput;
};


export type MutationAssignPermissionToFileArgs = {
  input: AssignPermissionToFileInput;
};


export type MutationAssignPermissionToFolderArgs = {
  input: AssignPermissionToFolderInput;
};


export type MutationAssignRoleArgs = {
  input: AssignRoleInput;
};


export type MutationAssignToDepartmentArgs = {
  input: AssignToDepartmentInput;
};


export type MutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};


export type MutationCreateDynamicPermissionRuleArgs = {
  input: CreateDynamicPermissionRuleInput;
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


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkflowArgs = {
  input: CreateWorkflowInput;
};


export type MutationDeactivateDepartmentArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeactivateUserArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeactivateWorkflowArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteFileArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteFolderArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['UUID']['input'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteWorkflowArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteWorkflowStepArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['UUID']['input'];
};


export type MutationProcessRequestArgs = {
  action: RequestStepStatus;
  comments?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  requestId: Scalars['UUID']['input'];
};


export type MutationRemovePermissionFromFileArgs = {
  input: RemovePermissionFromFileInput;
};


export type MutationRemovePermissionFromFolderArgs = {
  input: RemovePermissionFromFolderInput;
};


export type MutationRemoveUserFromGroupArgs = {
  input: RemoveUserFromGroupInput;
};


export type MutationRestoreFileArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRestoreFolderArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationSetDefaultWorkflowArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationSetManagerArgs = {
  input: SetManagerInput;
};


export type MutationUpdateDepartmentArgs = {
  input: UpdateDepartmentInput;
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


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUpdateWorkflowArgs = {
  input: UpdateWorkflowInput;
};


export type MutationUpdateWorkflowStepArgs = {
  input: UpdateWorkflowStepInput;
};

/** A segment of a collection. */
export type MyNotificationsCollectionSegment = {
  __typename?: 'MyNotificationsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Notification>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

/** A segment of a collection. */
export type MyUnreadNotificationCountCollectionSegment = {
  __typename?: 'MyUnreadNotificationCountCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Notification>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type Notification = {
  __typename?: 'Notification';
  actionUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  priority: NotificationPriority;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  recipientGroup?: Maybe<UserGroup>;
  recipientGroupId?: Maybe<Scalars['UUID']['output']>;
  recipientUser?: Maybe<User>;
  recipientUserId?: Maybe<Scalars['UUID']['output']>;
  relatedEntityId?: Maybe<Scalars['UUID']['output']>;
  relatedEntityType?: Maybe<PermissionType>;
  status: NotificationStatus;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NotificationFilterInput = {
  actionUrl?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<NotificationFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  expiresAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  message?: InputMaybe<StringOperationFilterInput>;
  metadata?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<NotificationFilterInput>>;
  priority?: InputMaybe<NotificationPriorityOperationFilterInput>;
  readAt?: InputMaybe<DateTimeOperationFilterInput>;
  recipientGroup?: InputMaybe<UserGroupFilterInput>;
  recipientGroupId?: InputMaybe<UuidOperationFilterInput>;
  recipientUser?: InputMaybe<UserFilterInput>;
  recipientUserId?: InputMaybe<UuidOperationFilterInput>;
  relatedEntityId?: InputMaybe<UuidOperationFilterInput>;
  relatedEntityType?: InputMaybe<NullableOfPermissionTypeOperationFilterInput>;
  status?: InputMaybe<NotificationStatusOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  type?: InputMaybe<StringOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export enum NotificationPriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type NotificationPriorityOperationFilterInput = {
  eq?: InputMaybe<NotificationPriority>;
  in?: InputMaybe<Array<NotificationPriority>>;
  neq?: InputMaybe<NotificationPriority>;
  nin?: InputMaybe<Array<NotificationPriority>>;
};

export enum NotificationStatus {
  Archived = 'ARCHIVED',
  Completed = 'COMPLETED',
  Dismissed = 'DISMISSED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Read = 'READ',
  Unread = 'UNREAD'
}

export type NotificationStatusOperationFilterInput = {
  eq?: InputMaybe<NotificationStatus>;
  in?: InputMaybe<Array<NotificationStatus>>;
  neq?: InputMaybe<NotificationStatus>;
  nin?: InputMaybe<Array<NotificationStatus>>;
};

export type NullableOfPermissionTypeOperationFilterInput = {
  eq?: InputMaybe<PermissionType>;
  in?: InputMaybe<Array<InputMaybe<PermissionType>>>;
  neq?: InputMaybe<PermissionType>;
  nin?: InputMaybe<Array<InputMaybe<PermissionType>>>;
};

export type NullableOfRequestStepStatusOperationFilterInput = {
  eq?: InputMaybe<RequestStepStatus>;
  in?: InputMaybe<Array<InputMaybe<RequestStepStatus>>>;
  neq?: InputMaybe<RequestStepStatus>;
  nin?: InputMaybe<Array<InputMaybe<RequestStepStatus>>>;
};

export type PendingRequestByAge = {
  __typename?: 'PendingRequestByAge';
  ageRange: Scalars['String']['output'];
  maxAgeHours: Scalars['Int']['output'];
  minAgeHours: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
  rangeLabel: Scalars['String']['output'];
  requestCount: Scalars['Int']['output'];
};

export type PendingRequestByAgeFilterInput = {
  ageRange?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<PendingRequestByAgeFilterInput>>;
  maxAgeHours?: InputMaybe<IntOperationFilterInput>;
  minAgeHours?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<PendingRequestByAgeFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
  rangeLabel?: InputMaybe<StringOperationFilterInput>;
  requestCount?: InputMaybe<IntOperationFilterInput>;
};

/** A segment of a collection. */
export type PendingRequestsCollectionSegment = {
  __typename?: 'PendingRequestsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Request>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type Permission = {
  __typename?: 'Permission';
  _For?: Maybe<PermissionType>;
  allowed: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  inherited: Scalars['Boolean']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** A segment of a collection. */
export type PermissionAssigneesCollectionSegment = {
  __typename?: 'PermissionAssigneesCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<AssigneeInfo>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type PermissionFilterInput = {
  _For?: InputMaybe<NullableOfPermissionTypeOperationFilterInput>;
  allowed?: InputMaybe<ListStringOperationFilterInput>;
  and?: InputMaybe<Array<PermissionFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  inherited?: InputMaybe<BooleanOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PermissionFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type PermissionSortInput = {
  _For?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  inherited?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export enum PermissionType {
  File = 'FILE',
  Folder = 'FOLDER',
  Request = 'REQUEST',
  Workflow = 'WORKFLOW'
}

/** A segment of a collection. */
export type PermissionsCollectionSegment = {
  __typename?: 'PermissionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Permission>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  childDepartments: Array<Department>;
  defaultRoles: Array<Role>;
  departmentById?: Maybe<Department>;
  departmentStatistics: DepartmentStatistics;
  departments?: Maybe<DepartmentsCollectionSegment>;
  fileAnalytics: FileAnalytics;
  fileById?: Maybe<File>;
  filePermissions?: Maybe<FilePermissionsCollectionSegment>;
  fileVersionHistory: Array<FileVersion>;
  files?: Maybe<FilesCollectionSegment>;
  filesByFolderId: Array<File>;
  folderById?: Maybe<Folder>;
  folderPermissions?: Maybe<FolderPermissionsCollectionSegment>;
  folders?: Maybe<FoldersCollectionSegment>;
  me?: Maybe<User>;
  myNotifications?: Maybe<MyNotificationsCollectionSegment>;
  myUnreadNotificationCount?: Maybe<MyUnreadNotificationCountCollectionSegment>;
  pendingRequests?: Maybe<PendingRequestsCollectionSegment>;
  permissionAssignees?: Maybe<PermissionAssigneesCollectionSegment>;
  permissionById?: Maybe<Permission>;
  permissions?: Maybe<PermissionsCollectionSegment>;
  permissionsByType: Array<Permission>;
  requestHistory?: Maybe<RequestHistoryCollectionSegment>;
  requests?: Maybe<RequestsCollectionSegment>;
  roleById?: Maybe<Role>;
  roleByName?: Maybe<Role>;
  roles: Array<Role>;
  rootDepartments: Array<Department>;
  searchDepartments: Array<Department>;
  searchUsers: Array<User>;
  storageAnalytics: StorageAnalytics;
  systemOverview: SystemOverview;
  userActivityAnalytics: UserActivityAnalytics;
  userById?: Maybe<User>;
  userStatistics: UserStatistics;
  users: Array<User>;
  usersByDepartment: Array<User>;
  usersByRole: Array<User>;
  workflowAnalytics: WorkflowAnalytics;
  workflowSteps: Array<WorkflowStep>;
  workflows: Array<Workflow>;
};


export type QueryChildDepartmentsArgs = {
  parentDepartmentId: Scalars['UUID']['input'];
};


export type QueryDepartmentByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryDepartmentsArgs = {
  order?: InputMaybe<Array<DepartmentSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepartmentFilterInput>;
};


export type QueryFileAnalyticsArgs = {
  where?: InputMaybe<FileAnalyticsFilterInput>;
};


export type QueryFileByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFilePermissionsArgs = {
  fileId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FilePermissionSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FilePermissionFilterInput>;
};


export type QueryFileVersionHistoryArgs = {
  fileId: Scalars['UUID']['input'];
};


export type QueryFilesArgs = {
  folderId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FileSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FileFilterInput>;
};


export type QueryFilesByFolderIdArgs = {
  folderId: Scalars['UUID']['input'];
};


export type QueryFolderByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryFolderPermissionsArgs = {
  folderId: Scalars['UUID']['input'];
  order?: InputMaybe<Array<FolderPermissionSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FolderPermissionFilterInput>;
};


export type QueryFoldersArgs = {
  order?: InputMaybe<Array<FolderSortInput>>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FolderFilterInput>;
};


export type QueryMyNotificationsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationFilterInput>;
};


export type QueryMyUnreadNotificationCountArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationFilterInput>;
};


export type QueryPendingRequestsArgs = {
  order?: InputMaybe<Array<RequestSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RequestFilterInput>;
};


export type QueryPermissionAssigneesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssigneeInfoFilterInput>;
};


export type QueryPermissionByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryPermissionsArgs = {
  order?: InputMaybe<Array<PermissionSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PermissionFilterInput>;
};


export type QueryPermissionsByTypeArgs = {
  permissionType: PermissionType;
};


export type QueryRequestHistoryArgs = {
  order?: InputMaybe<Array<RequestStepSortInput>>;
  requestId: Scalars['UUID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RequestStepFilterInput>;
};


export type QueryRequestsArgs = {
  order?: InputMaybe<Array<RequestSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RequestFilterInput>;
};


export type QueryRoleByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryRoleByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryRolesArgs = {
  order?: InputMaybe<Array<RoleSortInput>>;
  where?: InputMaybe<RoleFilterInput>;
};


export type QuerySearchDepartmentsArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QueryStorageAnalyticsArgs = {
  where?: InputMaybe<StorageAnalyticsFilterInput>;
};


export type QuerySystemOverviewArgs = {
  where?: InputMaybe<SystemOverviewFilterInput>;
};


export type QueryUserActivityAnalyticsArgs = {
  where?: InputMaybe<UserActivityAnalyticsFilterInput>;
};


export type QueryUserByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryUsersArgs = {
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};


export type QueryUsersByDepartmentArgs = {
  departmentId: Scalars['UUID']['input'];
};


export type QueryUsersByRoleArgs = {
  roleId: Scalars['UUID']['input'];
};


export type QueryWorkflowAnalyticsArgs = {
  where?: InputMaybe<WorkflowAnalyticsFilterInput>;
};


export type QueryWorkflowStepsArgs = {
  workflowId: Scalars['UUID']['input'];
};


export type QueryWorkflowsArgs = {
  order?: InputMaybe<Array<WorkflowSortInput>>;
  where?: InputMaybe<WorkflowFilterInput>;
};

export type RecentActivity = {
  __typename?: 'RecentActivity';
  action: Scalars['String']['output'];
  activityId: Scalars['UUID']['output'];
  description: Scalars['String']['output'];
  resourceName: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  timeAgo: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  userName: Scalars['String']['output'];
};

export type RecentActivityFilterInput = {
  action?: InputMaybe<StringOperationFilterInput>;
  activityId?: InputMaybe<UuidOperationFilterInput>;
  and?: InputMaybe<Array<RecentActivityFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RecentActivityFilterInput>>;
  resourceName?: InputMaybe<StringOperationFilterInput>;
  resourceType?: InputMaybe<StringOperationFilterInput>;
  timeAgo?: InputMaybe<StringOperationFilterInput>;
  timestamp?: InputMaybe<DateTimeOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type RemovePermissionFromFileInput = {
  fileId: Scalars['UUID']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type RemovePermissionFromFolderInput = {
  folderId: Scalars['UUID']['input'];
  permissionId: Scalars['UUID']['input'];
};

export type RemoveUserFromGroupInput = {
  groupId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export type Request = {
  __typename?: 'Request';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  status: RequestStatus;
  steps: Array<RequestStep>;
  submittedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type RequestFilterInput = {
  and?: InputMaybe<Array<RequestFilterInput>>;
  completedAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  expiryDate?: InputMaybe<DateTimeOperationFilterInput>;
  file?: InputMaybe<FileFilterInput>;
  fileId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<RequestFilterInput>>;
  status?: InputMaybe<RequestStatusOperationFilterInput>;
  steps?: InputMaybe<ListFilterInputTypeOfRequestStepFilterInput>;
  submittedAt?: InputMaybe<DateTimeOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  user?: InputMaybe<UserFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
};

/** A segment of a collection. */
export type RequestHistoryCollectionSegment = {
  __typename?: 'RequestHistoryCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<RequestStep>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type RequestSortInput = {
  completedAt?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  expiryDate?: InputMaybe<SortEnumType>;
  file?: InputMaybe<FileSortInput>;
  fileId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  submittedAt?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UserSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum RequestStatus {
  Approved = 'APPROVED',
  Archived = 'ARCHIVED',
  ChangesRequested = 'CHANGES_REQUESTED',
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  InReview = 'IN_REVIEW',
  PendingReview = 'PENDING_REVIEW',
  Processed = 'PROCESSED',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED'
}

export type RequestStatusOperationFilterInput = {
  eq?: InputMaybe<RequestStatus>;
  in?: InputMaybe<Array<RequestStatus>>;
  neq?: InputMaybe<RequestStatus>;
  nin?: InputMaybe<Array<RequestStatus>>;
};

export type RequestStep = {
  __typename?: 'RequestStep';
  action?: Maybe<Scalars['String']['output']>;
  actionAt?: Maybe<Scalars['DateTime']['output']>;
  actionByUser?: Maybe<User>;
  actionByUserId?: Maybe<Scalars['UUID']['output']>;
  actionComments?: Maybe<Scalars['String']['output']>;
  assignedTo: UserGroup;
  assignedToId: Scalars['UUID']['output'];
  canDelegate: Scalars['Boolean']['output'];
  comments?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  delegatedTo?: Maybe<UserGroup>;
  delegatedToId?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expiredAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  request: Request;
  requestId: Scalars['UUID']['output'];
  sequence: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: RequestStepStatus;
  stepNumber: Scalars['Int']['output'];
  timeoutHours?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RequestStepFilterInput = {
  action?: InputMaybe<StringOperationFilterInput>;
  actionAt?: InputMaybe<DateTimeOperationFilterInput>;
  actionByUser?: InputMaybe<UserFilterInput>;
  actionByUserId?: InputMaybe<UuidOperationFilterInput>;
  actionComments?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<RequestStepFilterInput>>;
  assignedTo?: InputMaybe<UserGroupFilterInput>;
  assignedToId?: InputMaybe<UuidOperationFilterInput>;
  canDelegate?: InputMaybe<BooleanOperationFilterInput>;
  comments?: InputMaybe<StringOperationFilterInput>;
  completedAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  delegatedTo?: InputMaybe<UserGroupFilterInput>;
  delegatedToId?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  expiredAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isRequired?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<RequestStepFilterInput>>;
  request?: InputMaybe<RequestFilterInput>;
  requestId?: InputMaybe<UuidOperationFilterInput>;
  sequence?: InputMaybe<IntOperationFilterInput>;
  startedAt?: InputMaybe<DateTimeOperationFilterInput>;
  status?: InputMaybe<RequestStepStatusOperationFilterInput>;
  stepNumber?: InputMaybe<IntOperationFilterInput>;
  timeoutHours?: InputMaybe<IntOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type RequestStepSortInput = {
  action?: InputMaybe<SortEnumType>;
  actionAt?: InputMaybe<SortEnumType>;
  actionByUser?: InputMaybe<UserSortInput>;
  actionByUserId?: InputMaybe<SortEnumType>;
  actionComments?: InputMaybe<SortEnumType>;
  assignedTo?: InputMaybe<UserGroupSortInput>;
  assignedToId?: InputMaybe<SortEnumType>;
  canDelegate?: InputMaybe<SortEnumType>;
  comments?: InputMaybe<SortEnumType>;
  completedAt?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  delegatedTo?: InputMaybe<UserGroupSortInput>;
  delegatedToId?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  expiredAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isRequired?: InputMaybe<SortEnumType>;
  request?: InputMaybe<RequestSortInput>;
  requestId?: InputMaybe<SortEnumType>;
  sequence?: InputMaybe<SortEnumType>;
  startedAt?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  stepNumber?: InputMaybe<SortEnumType>;
  timeoutHours?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export enum RequestStepStatus {
  Approved = 'APPROVED',
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Skipped = 'SKIPPED'
}

export type RequestStepStatusOperationFilterInput = {
  eq?: InputMaybe<RequestStepStatus>;
  in?: InputMaybe<Array<RequestStepStatus>>;
  neq?: InputMaybe<RequestStepStatus>;
  nin?: InputMaybe<Array<RequestStepStatus>>;
};

export type RequestTrend = {
  __typename?: 'RequestTrend';
  approvalRate: Scalars['Float']['output'];
  approvedRequests: Scalars['Int']['output'];
  pendingRequests: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  periodEnd: Scalars['DateTime']['output'];
  periodStart: Scalars['DateTime']['output'];
  periodType: Scalars['String']['output'];
  rejectedRequests: Scalars['Int']['output'];
  totalRequests: Scalars['Int']['output'];
};

export type RequestTrendFilterInput = {
  and?: InputMaybe<Array<RequestTrendFilterInput>>;
  approvalRate?: InputMaybe<FloatOperationFilterInput>;
  approvedRequests?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<RequestTrendFilterInput>>;
  pendingRequests?: InputMaybe<IntOperationFilterInput>;
  period?: InputMaybe<StringOperationFilterInput>;
  periodEnd?: InputMaybe<DateTimeOperationFilterInput>;
  periodStart?: InputMaybe<DateTimeOperationFilterInput>;
  periodType?: InputMaybe<StringOperationFilterInput>;
  rejectedRequests?: InputMaybe<IntOperationFilterInput>;
  totalRequests?: InputMaybe<IntOperationFilterInput>;
};

/** A segment of a collection. */
export type RequestsCollectionSegment = {
  __typename?: 'RequestsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Request>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDefault: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<User>;
};

export type RoleFilterInput = {
  and?: InputMaybe<Array<RoleFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDefault?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoleFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  users?: InputMaybe<ListFilterInputTypeOfUserFilterInput>;
};

export type RoleSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDefault?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export enum RuleConditionType {
  CustomExpression = 'CUSTOM_EXPRESSION',
  LocationBased = 'LOCATION_BASED',
  ResourceAttribute = 'RESOURCE_ATTRIBUTE',
  TimeBased = 'TIME_BASED',
  UserAttribute = 'USER_ATTRIBUTE',
  UserDepartment = 'USER_DEPARTMENT',
  UserRole = 'USER_ROLE'
}

export enum RuleOperator {
  Contains = 'CONTAINS',
  EndsWith = 'ENDS_WITH',
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  In = 'IN',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  NotEquals = 'NOT_EQUALS',
  NotIn = 'NOT_IN',
  StartsWith = 'STARTS_WITH'
}

export enum RuleType {
  And = 'AND',
  Or = 'OR',
  Simple = 'SIMPLE'
}

export type SetManagerInput = {
  managerId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StepPerformance = {
  __typename?: 'StepPerformance';
  averageProcessingTime: Scalars['TimeSpan']['output'];
  completedRequests: Scalars['Int']['output'];
  completionRate: Scalars['Float']['output'];
  medianProcessingTime: Scalars['TimeSpan']['output'];
  pendingRequests: Scalars['Int']['output'];
  stepId: Scalars['UUID']['output'];
  stepName: Scalars['String']['output'];
  stepOrder: Scalars['Int']['output'];
  totalRequests: Scalars['Int']['output'];
  workflowId: Scalars['UUID']['output'];
  workflowName: Scalars['String']['output'];
};

export type StepPerformanceFilterInput = {
  and?: InputMaybe<Array<StepPerformanceFilterInput>>;
  averageProcessingTime?: InputMaybe<TimeSpanOperationFilterInput>;
  completedRequests?: InputMaybe<IntOperationFilterInput>;
  completionRate?: InputMaybe<FloatOperationFilterInput>;
  medianProcessingTime?: InputMaybe<TimeSpanOperationFilterInput>;
  or?: InputMaybe<Array<StepPerformanceFilterInput>>;
  pendingRequests?: InputMaybe<IntOperationFilterInput>;
  stepId?: InputMaybe<UuidOperationFilterInput>;
  stepName?: InputMaybe<StringOperationFilterInput>;
  stepOrder?: InputMaybe<IntOperationFilterInput>;
  totalRequests?: InputMaybe<IntOperationFilterInput>;
  workflowId?: InputMaybe<UuidOperationFilterInput>;
  workflowName?: InputMaybe<StringOperationFilterInput>;
};

export type StorageAnalytics = {
  __typename?: 'StorageAnalytics';
  averageFileSize: Scalars['Long']['output'];
  fileSizeDistributions: Array<FileSizeDistribution>;
  filesOver1GB: Scalars['Int']['output'];
  filesOver100MB: Scalars['Int']['output'];
  filesUnder1MB: Scalars['Int']['output'];
  storageByDepartments: Array<StorageByDepartment>;
  storageGrowthLastMonth: Scalars['Long']['output'];
  storageGrowthPercentage: Scalars['Float']['output'];
  storageGrowthTrends: Array<StorageGrowthTrend>;
  storageUsedLastMonth: Scalars['Long']['output'];
  topUsersByStorage: Array<StorageByUser>;
  totalFiles: Scalars['Int']['output'];
  totalStorageUsed: Scalars['Long']['output'];
};

export type StorageAnalyticsFilterInput = {
  and?: InputMaybe<Array<StorageAnalyticsFilterInput>>;
  averageFileSize?: InputMaybe<LongOperationFilterInput>;
  fileSizeDistributions?: InputMaybe<ListFilterInputTypeOfFileSizeDistributionFilterInput>;
  filesOver1GB?: InputMaybe<IntOperationFilterInput>;
  filesOver100MB?: InputMaybe<IntOperationFilterInput>;
  filesUnder1MB?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<StorageAnalyticsFilterInput>>;
  storageByDepartments?: InputMaybe<ListFilterInputTypeOfStorageByDepartmentFilterInput>;
  storageGrowthLastMonth?: InputMaybe<LongOperationFilterInput>;
  storageGrowthPercentage?: InputMaybe<FloatOperationFilterInput>;
  storageGrowthTrends?: InputMaybe<ListFilterInputTypeOfStorageGrowthTrendFilterInput>;
  storageUsedLastMonth?: InputMaybe<LongOperationFilterInput>;
  topUsersByStorage?: InputMaybe<ListFilterInputTypeOfStorageByUserFilterInput>;
  totalFiles?: InputMaybe<IntOperationFilterInput>;
  totalStorageUsed?: InputMaybe<LongOperationFilterInput>;
};

export type StorageByDepartment = {
  __typename?: 'StorageByDepartment';
  departmentId: Scalars['UUID']['output'];
  departmentName: Scalars['String']['output'];
  fileCount: Scalars['Int']['output'];
  filesPerUser: Scalars['Float']['output'];
  percentage: Scalars['Float']['output'];
  storagePerUser: Scalars['Float']['output'];
  storageUsed: Scalars['Long']['output'];
  userCount: Scalars['Int']['output'];
};

export type StorageByDepartmentFilterInput = {
  and?: InputMaybe<Array<StorageByDepartmentFilterInput>>;
  departmentId?: InputMaybe<UuidOperationFilterInput>;
  departmentName?: InputMaybe<StringOperationFilterInput>;
  fileCount?: InputMaybe<IntOperationFilterInput>;
  filesPerUser?: InputMaybe<FloatOperationFilterInput>;
  or?: InputMaybe<Array<StorageByDepartmentFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
  storagePerUser?: InputMaybe<FloatOperationFilterInput>;
  storageUsed?: InputMaybe<LongOperationFilterInput>;
  userCount?: InputMaybe<IntOperationFilterInput>;
};

export type StorageByType = {
  __typename?: 'StorageByType';
  fileCount: Scalars['Int']['output'];
  mimeType: Scalars['String']['output'];
  percentage: Scalars['Float']['output'];
  totalSize: Scalars['Long']['output'];
  typeCategory: Scalars['String']['output'];
};

export type StorageByTypeFilterInput = {
  and?: InputMaybe<Array<StorageByTypeFilterInput>>;
  fileCount?: InputMaybe<IntOperationFilterInput>;
  mimeType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StorageByTypeFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
  totalSize?: InputMaybe<LongOperationFilterInput>;
  typeCategory?: InputMaybe<StringOperationFilterInput>;
};

export type StorageByUser = {
  __typename?: 'StorageByUser';
  averageFileSize: Scalars['Float']['output'];
  departmentName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fileCount: Scalars['Int']['output'];
  lastUpload: Scalars['DateTime']['output'];
  percentage: Scalars['Float']['output'];
  roleName: Scalars['String']['output'];
  storageUsed: Scalars['Long']['output'];
  userId: Scalars['UUID']['output'];
  userName: Scalars['String']['output'];
};

export type StorageByUserFilterInput = {
  and?: InputMaybe<Array<StorageByUserFilterInput>>;
  averageFileSize?: InputMaybe<FloatOperationFilterInput>;
  departmentName?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  fileCount?: InputMaybe<IntOperationFilterInput>;
  lastUpload?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<StorageByUserFilterInput>>;
  percentage?: InputMaybe<FloatOperationFilterInput>;
  roleName?: InputMaybe<StringOperationFilterInput>;
  storageUsed?: InputMaybe<LongOperationFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type StorageGrowthTrend = {
  __typename?: 'StorageGrowthTrend';
  growthPercentage: Scalars['Float']['output'];
  newFiles: Scalars['Int']['output'];
  newStorage: Scalars['Long']['output'];
  period: Scalars['String']['output'];
  periodEnd: Scalars['DateTime']['output'];
  periodStart: Scalars['DateTime']['output'];
  periodType: Scalars['String']['output'];
  storageGrowth: Scalars['Long']['output'];
  storageUsed: Scalars['Long']['output'];
};

export type StorageGrowthTrendFilterInput = {
  and?: InputMaybe<Array<StorageGrowthTrendFilterInput>>;
  growthPercentage?: InputMaybe<FloatOperationFilterInput>;
  newFiles?: InputMaybe<IntOperationFilterInput>;
  newStorage?: InputMaybe<LongOperationFilterInput>;
  or?: InputMaybe<Array<StorageGrowthTrendFilterInput>>;
  period?: InputMaybe<StringOperationFilterInput>;
  periodEnd?: InputMaybe<DateTimeOperationFilterInput>;
  periodStart?: InputMaybe<DateTimeOperationFilterInput>;
  periodType?: InputMaybe<StringOperationFilterInput>;
  storageGrowth?: InputMaybe<LongOperationFilterInput>;
  storageUsed?: InputMaybe<LongOperationFilterInput>;
};

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

export type SystemOverview = {
  __typename?: 'SystemOverview';
  activeUsers: Scalars['Int']['output'];
  adminUsers: Scalars['Int']['output'];
  approvedRequests: Scalars['Int']['output'];
  averageFileSize: Scalars['Long']['output'];
  filesUploadedThisWeek: Scalars['Int']['output'];
  filesUploadedToday: Scalars['Int']['output'];
  inactiveUsers: Scalars['Int']['output'];
  pendingRequests: Scalars['Int']['output'];
  recentActivitiesLast7d: Scalars['Int']['output'];
  recentActivitiesLast24h: Scalars['Int']['output'];
  rejectedRequests: Scalars['Int']['output'];
  storageByTypes: Array<StorageByType>;
  totalDepartments: Scalars['Int']['output'];
  totalFiles: Scalars['Int']['output'];
  totalFolders: Scalars['Int']['output'];
  totalRequests: Scalars['Int']['output'];
  totalStorageUsed: Scalars['Long']['output'];
  totalUsers: Scalars['Int']['output'];
  totalWorkflows: Scalars['Int']['output'];
};

export type SystemOverviewFilterInput = {
  activeUsers?: InputMaybe<IntOperationFilterInput>;
  adminUsers?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<SystemOverviewFilterInput>>;
  approvedRequests?: InputMaybe<IntOperationFilterInput>;
  averageFileSize?: InputMaybe<LongOperationFilterInput>;
  filesUploadedThisWeek?: InputMaybe<IntOperationFilterInput>;
  filesUploadedToday?: InputMaybe<IntOperationFilterInput>;
  inactiveUsers?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<SystemOverviewFilterInput>>;
  pendingRequests?: InputMaybe<IntOperationFilterInput>;
  recentActivitiesLast7d?: InputMaybe<IntOperationFilterInput>;
  recentActivitiesLast24h?: InputMaybe<IntOperationFilterInput>;
  rejectedRequests?: InputMaybe<IntOperationFilterInput>;
  storageByTypes?: InputMaybe<ListFilterInputTypeOfStorageByTypeFilterInput>;
  totalDepartments?: InputMaybe<IntOperationFilterInput>;
  totalFiles?: InputMaybe<IntOperationFilterInput>;
  totalFolders?: InputMaybe<IntOperationFilterInput>;
  totalRequests?: InputMaybe<IntOperationFilterInput>;
  totalStorageUsed?: InputMaybe<LongOperationFilterInput>;
  totalUsers?: InputMaybe<IntOperationFilterInput>;
  totalWorkflows?: InputMaybe<IntOperationFilterInput>;
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['UUID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  teamLead?: Maybe<User>;
  teamLeadId?: Maybe<Scalars['UUID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TeamFilterInput = {
  and?: InputMaybe<Array<TeamFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  department?: InputMaybe<DepartmentFilterInput>;
  departmentId?: InputMaybe<UuidOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TeamFilterInput>>;
  teamLead?: InputMaybe<UserFilterInput>;
  teamLeadId?: InputMaybe<UuidOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type TeamSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  department?: InputMaybe<DepartmentSortInput>;
  departmentId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  teamLead?: InputMaybe<UserSortInput>;
  teamLeadId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type TimeSpanOperationFilterInput = {
  eq?: InputMaybe<Scalars['TimeSpan']['input']>;
  gt?: InputMaybe<Scalars['TimeSpan']['input']>;
  gte?: InputMaybe<Scalars['TimeSpan']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  lt?: InputMaybe<Scalars['TimeSpan']['input']>;
  lte?: InputMaybe<Scalars['TimeSpan']['input']>;
  neq?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngt?: InputMaybe<Scalars['TimeSpan']['input']>;
  ngte?: InputMaybe<Scalars['TimeSpan']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['TimeSpan']['input']>>>;
  nlt?: InputMaybe<Scalars['TimeSpan']['input']>;
  nlte?: InputMaybe<Scalars['TimeSpan']['input']>;
};

export type TopApprover = {
  __typename?: 'TopApprover';
  approvalRate: Scalars['Float']['output'];
  averageResponseTime: Scalars['TimeSpan']['output'];
  departmentName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  lastActivity: Scalars['DateTime']['output'];
  roleName: Scalars['String']['output'];
  totalApprovals: Scalars['Int']['output'];
  totalRejections: Scalars['Int']['output'];
  totalReviews: Scalars['Int']['output'];
  userId: Scalars['UUID']['output'];
  userName: Scalars['String']['output'];
};

export type TopApproverFilterInput = {
  and?: InputMaybe<Array<TopApproverFilterInput>>;
  approvalRate?: InputMaybe<FloatOperationFilterInput>;
  averageResponseTime?: InputMaybe<TimeSpanOperationFilterInput>;
  departmentName?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  lastActivity?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TopApproverFilterInput>>;
  roleName?: InputMaybe<StringOperationFilterInput>;
  totalApprovals?: InputMaybe<IntOperationFilterInput>;
  totalRejections?: InputMaybe<IntOperationFilterInput>;
  totalReviews?: InputMaybe<IntOperationFilterInput>;
  userId?: InputMaybe<UuidOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type TopFileBySize = {
  __typename?: 'TopFileBySize';
  createdAt: Scalars['DateTime']['output'];
  fileId: Scalars['UUID']['output'];
  fileName: Scalars['String']['output'];
  formattedSize: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  ownerName: Scalars['String']['output'];
  size: Scalars['Long']['output'];
};

export type TopFileBySizeFilterInput = {
  and?: InputMaybe<Array<TopFileBySizeFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  fileId?: InputMaybe<UuidOperationFilterInput>;
  fileName?: InputMaybe<StringOperationFilterInput>;
  formattedSize?: InputMaybe<StringOperationFilterInput>;
  mimeType?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TopFileBySizeFilterInput>>;
  ownerName?: InputMaybe<StringOperationFilterInput>;
  size?: InputMaybe<LongOperationFilterInput>;
};

export type UpdateDepartmentInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentDepartmentId?: InputMaybe<Scalars['UUID']['input']>;
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

export type UpdateUserInput = {
  businessUnit?: InputMaybe<Scalars['String']['input']>;
  costCenter?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['UUID']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  employeeId?: InputMaybe<Scalars['String']['input']>;
  employmentType?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
  jobTitleId?: InputMaybe<Scalars['UUID']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  managerId?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateUserProfileInput = {
  businessUnit?: InputMaybe<Scalars['String']['input']>;
  costCenter?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  employeeId?: InputMaybe<Scalars['String']['input']>;
  employmentType?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowInput = {
  allowDelegation?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isSequential?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  requiredApprovals?: InputMaybe<Scalars['Int']['input']>;
  timeoutHours?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateWorkflowStepInput = {
  assignedToId?: InputMaybe<Scalars['UUID']['input']>;
  canDelegate?: InputMaybe<Scalars['Boolean']['input']>;
  completionActionConfig?: InputMaybe<Scalars['String']['input']>;
  conditionExpression?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  rejectionActionConfig?: InputMaybe<Scalars['String']['input']>;
  stepName?: InputMaybe<Scalars['String']['input']>;
  stepNumber?: InputMaybe<Scalars['Int']['input']>;
  timeoutHours?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadTrend = {
  __typename?: 'UploadTrend';
  fileCount: Scalars['Int']['output'];
  period: Scalars['String']['output'];
  periodEnd: Scalars['DateTime']['output'];
  periodStart: Scalars['DateTime']['output'];
  periodType: Scalars['String']['output'];
  totalSize: Scalars['Long']['output'];
};

export type UploadTrendFilterInput = {
  and?: InputMaybe<Array<UploadTrendFilterInput>>;
  fileCount?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<UploadTrendFilterInput>>;
  period?: InputMaybe<StringOperationFilterInput>;
  periodEnd?: InputMaybe<DateTimeOperationFilterInput>;
  periodStart?: InputMaybe<DateTimeOperationFilterInput>;
  periodType?: InputMaybe<StringOperationFilterInput>;
  totalSize?: InputMaybe<LongOperationFilterInput>;
};

export type User = {
  __typename?: 'User';
  businessUnit?: Maybe<Scalars['String']['output']>;
  costCenter?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['UUID']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerificationToken?: Maybe<Scalars['String']['output']>;
  emailVerificationTokenExpires?: Maybe<Scalars['DateTime']['output']>;
  employeeId?: Maybe<Scalars['String']['output']>;
  employmentType?: Maybe<Scalars['String']['output']>;
  hireDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  jobTitle?: Maybe<JobTitle>;
  jobTitleId?: Maybe<Scalars['UUID']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  manager?: Maybe<User>;
  managerId?: Maybe<Scalars['UUID']['output']>;
  name: Scalars['String']['output'];
  passwordResetToken?: Maybe<Scalars['String']['output']>;
  passwordResetTokenExpires?: Maybe<Scalars['DateTime']['output']>;
  roleId: Scalars['UUID']['output'];
  status: RequestStatus;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserActivityAnalytics = {
  __typename?: 'UserActivityAnalytics';
  activeUsersLast7d: Scalars['Int']['output'];
  activeUsersLast30d: Scalars['Int']['output'];
  activityTrends: Array<ActivityTrend>;
  departmentActivities: Array<DepartmentActivity>;
  loginTrends: Array<LoginTrend>;
  mostActiveUsers: Array<MostActiveUser>;
  newUsersLast7d: Scalars['Int']['output'];
  newUsersLast30d: Scalars['Int']['output'];
  recentActivities: Array<RecentActivity>;
  totalLoginsThisWeek: Scalars['Int']['output'];
  totalLoginsToday: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
};

export type UserActivityAnalyticsFilterInput = {
  activeUsersLast7d?: InputMaybe<IntOperationFilterInput>;
  activeUsersLast30d?: InputMaybe<IntOperationFilterInput>;
  activityTrends?: InputMaybe<ListFilterInputTypeOfActivityTrendFilterInput>;
  and?: InputMaybe<Array<UserActivityAnalyticsFilterInput>>;
  departmentActivities?: InputMaybe<ListFilterInputTypeOfDepartmentActivityFilterInput>;
  loginTrends?: InputMaybe<ListFilterInputTypeOfLoginTrendFilterInput>;
  mostActiveUsers?: InputMaybe<ListFilterInputTypeOfMostActiveUserFilterInput>;
  newUsersLast7d?: InputMaybe<IntOperationFilterInput>;
  newUsersLast30d?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<UserActivityAnalyticsFilterInput>>;
  recentActivities?: InputMaybe<ListFilterInputTypeOfRecentActivityFilterInput>;
  totalLoginsThisWeek?: InputMaybe<IntOperationFilterInput>;
  totalLoginsToday?: InputMaybe<IntOperationFilterInput>;
  totalUsers?: InputMaybe<IntOperationFilterInput>;
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  businessUnit?: InputMaybe<StringOperationFilterInput>;
  costCenter?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  department?: InputMaybe<DepartmentFilterInput>;
  departmentId?: InputMaybe<UuidOperationFilterInput>;
  division?: InputMaybe<StringOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailVerificationToken?: InputMaybe<StringOperationFilterInput>;
  emailVerificationTokenExpires?: InputMaybe<DateTimeOperationFilterInput>;
  employeeId?: InputMaybe<StringOperationFilterInput>;
  employmentType?: InputMaybe<StringOperationFilterInput>;
  hireDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isEmailVerified?: InputMaybe<BooleanOperationFilterInput>;
  jobTitle?: InputMaybe<JobTitleFilterInput>;
  jobTitleId?: InputMaybe<UuidOperationFilterInput>;
  location?: InputMaybe<StringOperationFilterInput>;
  manager?: InputMaybe<UserFilterInput>;
  managerId?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  passwordResetToken?: InputMaybe<StringOperationFilterInput>;
  passwordResetTokenExpires?: InputMaybe<DateTimeOperationFilterInput>;
  roleId?: InputMaybe<UuidOperationFilterInput>;
  status?: InputMaybe<RequestStatusOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  departmentId?: Maybe<Scalars['UUID']['output']>;
  description: Scalars['String']['output'];
  file?: Maybe<File>;
  fileId?: Maybe<Scalars['UUID']['output']>;
  folder?: Maybe<Folder>;
  folderId?: Maybe<Scalars['UUID']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  projectId?: Maybe<Scalars['UUID']['output']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['UUID']['output']>;
  team?: Maybe<Team>;
  teamId?: Maybe<Scalars['UUID']['output']>;
  type: GroupType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserGroupFilterInput = {
  and?: InputMaybe<Array<UserGroupFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  department?: InputMaybe<DepartmentFilterInput>;
  departmentId?: InputMaybe<UuidOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  file?: InputMaybe<FileFilterInput>;
  fileId?: InputMaybe<UuidOperationFilterInput>;
  folder?: InputMaybe<FolderFilterInput>;
  folderId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserGroupFilterInput>>;
  projectId?: InputMaybe<UuidOperationFilterInput>;
  role?: InputMaybe<RoleFilterInput>;
  roleId?: InputMaybe<UuidOperationFilterInput>;
  team?: InputMaybe<TeamFilterInput>;
  teamId?: InputMaybe<UuidOperationFilterInput>;
  type?: InputMaybe<GroupTypeOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type UserGroupSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  department?: InputMaybe<DepartmentSortInput>;
  departmentId?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  file?: InputMaybe<FileSortInput>;
  fileId?: InputMaybe<SortEnumType>;
  folder?: InputMaybe<FolderSortInput>;
  folderId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  projectId?: InputMaybe<SortEnumType>;
  role?: InputMaybe<RoleSortInput>;
  roleId?: InputMaybe<SortEnumType>;
  team?: InputMaybe<TeamSortInput>;
  teamId?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type UserSortInput = {
  businessUnit?: InputMaybe<SortEnumType>;
  costCenter?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  department?: InputMaybe<DepartmentSortInput>;
  departmentId?: InputMaybe<SortEnumType>;
  division?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  emailVerificationToken?: InputMaybe<SortEnumType>;
  emailVerificationTokenExpires?: InputMaybe<SortEnumType>;
  employeeId?: InputMaybe<SortEnumType>;
  employmentType?: InputMaybe<SortEnumType>;
  hireDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isEmailVerified?: InputMaybe<SortEnumType>;
  jobTitle?: InputMaybe<JobTitleSortInput>;
  jobTitleId?: InputMaybe<SortEnumType>;
  location?: InputMaybe<SortEnumType>;
  manager?: InputMaybe<UserSortInput>;
  managerId?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  passwordResetToken?: InputMaybe<SortEnumType>;
  passwordResetTokenExpires?: InputMaybe<SortEnumType>;
  roleId?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type UserStatistics = {
  __typename?: 'UserStatistics';
  activeUsers: Scalars['Int']['output'];
  inactiveUsers: Scalars['Int']['output'];
  totalUsers: Scalars['Int']['output'];
  usersByDepartment: Scalars['Int']['output'];
  usersByEmploymentType: Array<KeyValuePairOfStringAndInt32>;
  usersByLocation: Array<KeyValuePairOfStringAndInt32>;
  usersByRole: Scalars['Int']['output'];
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

export type Workflow = {
  __typename?: 'Workflow';
  allowDelegation: Scalars['Boolean']['output'];
  cancelActionConfig?: Maybe<Scalars['String']['output']>;
  changesRequestedActionConfig?: Maybe<Scalars['String']['output']>;
  completionActionConfig?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isSequential: Scalars['Boolean']['output'];
  isSystemDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rejectionActionConfig?: Maybe<Scalars['String']['output']>;
  requiredApprovals: Scalars['Int']['output'];
  stepCount: Scalars['Int']['output'];
  steps: Array<WorkflowStep>;
  timeoutHours?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WorkflowAnalytics = {
  __typename?: 'WorkflowAnalytics';
  activeWorkflows: Scalars['Int']['output'];
  approvalRate: Scalars['Float']['output'];
  approvedRequests: Scalars['Int']['output'];
  averageProcessingTime: Scalars['TimeSpan']['output'];
  cancelledRequests: Scalars['Int']['output'];
  inactiveWorkflows: Scalars['Int']['output'];
  medianProcessingTime: Scalars['TimeSpan']['output'];
  pendingRequests: Scalars['Int']['output'];
  pendingRequestsByAge: Array<PendingRequestByAge>;
  rejectedRequests: Scalars['Int']['output'];
  rejectionRate: Scalars['Float']['output'];
  requestTrends: Array<RequestTrend>;
  stepPerformances: Array<StepPerformance>;
  topApprovers: Array<TopApprover>;
  totalRequests: Scalars['Int']['output'];
  totalWorkflows: Scalars['Int']['output'];
  workflowPerformances: Array<WorkflowPerformance>;
};

export type WorkflowAnalyticsFilterInput = {
  activeWorkflows?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<WorkflowAnalyticsFilterInput>>;
  approvalRate?: InputMaybe<FloatOperationFilterInput>;
  approvedRequests?: InputMaybe<IntOperationFilterInput>;
  averageProcessingTime?: InputMaybe<TimeSpanOperationFilterInput>;
  cancelledRequests?: InputMaybe<IntOperationFilterInput>;
  inactiveWorkflows?: InputMaybe<IntOperationFilterInput>;
  medianProcessingTime?: InputMaybe<TimeSpanOperationFilterInput>;
  or?: InputMaybe<Array<WorkflowAnalyticsFilterInput>>;
  pendingRequests?: InputMaybe<IntOperationFilterInput>;
  pendingRequestsByAge?: InputMaybe<ListFilterInputTypeOfPendingRequestByAgeFilterInput>;
  rejectedRequests?: InputMaybe<IntOperationFilterInput>;
  rejectionRate?: InputMaybe<FloatOperationFilterInput>;
  requestTrends?: InputMaybe<ListFilterInputTypeOfRequestTrendFilterInput>;
  stepPerformances?: InputMaybe<ListFilterInputTypeOfStepPerformanceFilterInput>;
  topApprovers?: InputMaybe<ListFilterInputTypeOfTopApproverFilterInput>;
  totalRequests?: InputMaybe<IntOperationFilterInput>;
  totalWorkflows?: InputMaybe<IntOperationFilterInput>;
  workflowPerformances?: InputMaybe<ListFilterInputTypeOfWorkflowPerformanceFilterInput>;
};

export type WorkflowFilterInput = {
  allowDelegation?: InputMaybe<BooleanOperationFilterInput>;
  and?: InputMaybe<Array<WorkflowFilterInput>>;
  cancelActionConfig?: InputMaybe<StringOperationFilterInput>;
  changesRequestedActionConfig?: InputMaybe<StringOperationFilterInput>;
  completionActionConfig?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isSequential?: InputMaybe<BooleanOperationFilterInput>;
  isSystemDefault?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<WorkflowFilterInput>>;
  rejectionActionConfig?: InputMaybe<StringOperationFilterInput>;
  requiredApprovals?: InputMaybe<IntOperationFilterInput>;
  stepCount?: InputMaybe<IntOperationFilterInput>;
  steps?: InputMaybe<ListFilterInputTypeOfWorkflowStepFilterInput>;
  timeoutHours?: InputMaybe<IntOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type WorkflowPerformance = {
  __typename?: 'WorkflowPerformance';
  approvalRate: Scalars['Float']['output'];
  approvedRequests: Scalars['Int']['output'];
  averageProcessingTime: Scalars['TimeSpan']['output'];
  isActive: Scalars['Boolean']['output'];
  medianProcessingTime: Scalars['TimeSpan']['output'];
  pendingRequests: Scalars['Int']['output'];
  rejectedRequests: Scalars['Int']['output'];
  stepsCount: Scalars['Int']['output'];
  totalRequests: Scalars['Int']['output'];
  workflowId: Scalars['UUID']['output'];
  workflowName: Scalars['String']['output'];
};

export type WorkflowPerformanceFilterInput = {
  and?: InputMaybe<Array<WorkflowPerformanceFilterInput>>;
  approvalRate?: InputMaybe<FloatOperationFilterInput>;
  approvedRequests?: InputMaybe<IntOperationFilterInput>;
  averageProcessingTime?: InputMaybe<TimeSpanOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  medianProcessingTime?: InputMaybe<TimeSpanOperationFilterInput>;
  or?: InputMaybe<Array<WorkflowPerformanceFilterInput>>;
  pendingRequests?: InputMaybe<IntOperationFilterInput>;
  rejectedRequests?: InputMaybe<IntOperationFilterInput>;
  stepsCount?: InputMaybe<IntOperationFilterInput>;
  totalRequests?: InputMaybe<IntOperationFilterInput>;
  workflowId?: InputMaybe<UuidOperationFilterInput>;
  workflowName?: InputMaybe<StringOperationFilterInput>;
};

export type WorkflowPermission = {
  __typename?: 'WorkflowPermission';
  assignments: Array<WorkflowPermissionAssignment>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isAllowed: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isInheritable: Scalars['Boolean']['output'];
  isInherited: Scalars['Boolean']['output'];
  permission: Permission;
  permissionId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  workflow: Workflow;
  workflowId: Scalars['UUID']['output'];
};

export type WorkflowPermissionAssignment = {
  __typename?: 'WorkflowPermissionAssignment';
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  permission: Permission;
  permissionId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId: Scalars['UUID']['output'];
  workflow: Workflow;
  workflowId: Scalars['UUID']['output'];
};

export type WorkflowSortInput = {
  allowDelegation?: InputMaybe<SortEnumType>;
  cancelActionConfig?: InputMaybe<SortEnumType>;
  changesRequestedActionConfig?: InputMaybe<SortEnumType>;
  completionActionConfig?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdById?: InputMaybe<SortEnumType>;
  deletedAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isSequential?: InputMaybe<SortEnumType>;
  isSystemDefault?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  rejectionActionConfig?: InputMaybe<SortEnumType>;
  requiredApprovals?: InputMaybe<SortEnumType>;
  stepCount?: InputMaybe<SortEnumType>;
  timeoutHours?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type WorkflowStep = {
  __typename?: 'WorkflowStep';
  assignedTo: UserGroup;
  assignedToId: Scalars['UUID']['output'];
  canDelegate: Scalars['Boolean']['output'];
  completionActionConfig?: Maybe<Scalars['String']['output']>;
  conditionExpression?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['UUID']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isRequired: Scalars['Boolean']['output'];
  rejectionActionConfig?: Maybe<Scalars['String']['output']>;
  status?: Maybe<RequestStepStatus>;
  stepName: Scalars['String']['output'];
  stepNumber: Scalars['Int']['output'];
  timeoutHours?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  workflow: Workflow;
  workflowId: Scalars['UUID']['output'];
};

export type WorkflowStepFilterInput = {
  and?: InputMaybe<Array<WorkflowStepFilterInput>>;
  assignedTo?: InputMaybe<UserGroupFilterInput>;
  assignedToId?: InputMaybe<UuidOperationFilterInput>;
  canDelegate?: InputMaybe<BooleanOperationFilterInput>;
  completionActionConfig?: InputMaybe<StringOperationFilterInput>;
  conditionExpression?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  createdById?: InputMaybe<UuidOperationFilterInput>;
  deletedAt?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isRequired?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<WorkflowStepFilterInput>>;
  rejectionActionConfig?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<NullableOfRequestStepStatusOperationFilterInput>;
  stepName?: InputMaybe<StringOperationFilterInput>;
  stepNumber?: InputMaybe<IntOperationFilterInput>;
  timeoutHours?: InputMaybe<IntOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  workflow?: InputMaybe<WorkflowFilterInput>;
  workflowId?: InputMaybe<UuidOperationFilterInput>;
};

export type CreateDepartmentMutationVariables = Exact<{
  input: CreateDepartmentInput;
}>;


export type CreateDepartmentMutation = { __typename?: 'Mutation', createDepartment: { __typename?: 'Department', id: any, name: string, description: string, code?: string | null, parentDepartmentId?: any | null, isActive: boolean, isDeleted: boolean, deletedAt?: any | null, createdAt: any, updatedAt?: any | null, createdById?: any | null } };

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

export type ProcessRequestMutationVariables = Exact<{
  requestId: Scalars['UUID']['input'];
  action: RequestStepStatus;
  comments?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProcessRequestMutation = { __typename?: 'Mutation', processRequest?: { __typename?: 'Request', id: any, fileId?: any | null, userId?: any | null, status: RequestStatus, description?: string | null, expiryDate?: any | null, submittedAt?: any | null, completedAt?: any | null, steps: Array<{ __typename?: 'RequestStep', id: any, requestId: any, stepNumber: number, status: RequestStepStatus, assignedToId: any, isRequired: boolean, timeoutHours?: number | null, canDelegate: boolean, delegatedToId?: any | null, startedAt?: any | null, completedAt?: any | null, expiredAt?: any | null, sequence: number, comments?: string | null, action?: string | null, actionAt?: any | null, actionComments?: string | null }> } | null };

export type GetFilesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  folderId: Scalars['UUID']['input'];
}>;


export type GetFilesQuery = { __typename?: 'Query', files?: { __typename?: 'FilesCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'File', id: any, name: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdById?: any | null, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type GetFileByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFileByIdQuery = { __typename?: 'Query', fileById?: { __typename?: 'File', id: any, name: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdById?: any | null, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number } | null };

export type GetFilesByFolderIdQueryVariables = Exact<{
  folderId: Scalars['UUID']['input'];
}>;


export type GetFilesByFolderIdQuery = { __typename?: 'Query', filesByFolderId: Array<{ __typename?: 'File', id: any, name: string, description?: string | null, size: any, mimeType: string, parentId?: any | null, createdById?: any | null, createdAt: any, updatedAt?: any | null, expiry?: any | null, currentVersion: number }> };

export type GetFileVersionHistoryQueryVariables = Exact<{
  fileId: Scalars['UUID']['input'];
}>;


export type GetFileVersionHistoryQuery = { __typename?: 'Query', fileVersionHistory: Array<{ __typename?: 'FileVersion', id: any, versionNumber: number, description?: string | null, size: any, createdById?: any | null, createdAt: any }> };

export type GetFoldersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type GetFoldersQuery = { __typename?: 'Query', folders?: { __typename?: 'FoldersCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Folder', id: any, name: string, description?: string | null, parentId?: any | null, createdById?: any | null, createdAt: any, updatedAt?: any | null }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type GetFolderByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFolderByIdQuery = { __typename?: 'Query', folderById?: { __typename?: 'Folder', id: any, name: string, description?: string | null, parentId?: any | null, createdById?: any | null, createdAt: any, updatedAt?: any | null } | null };

export type GetMyNotificationsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationFilterInput>;
}>;


export type GetMyNotificationsQuery = { __typename?: 'Query', myNotifications?: { __typename?: 'MyNotificationsCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Notification', id: any, title: string, message: string, type: string, relatedEntityId?: any | null, relatedEntityType?: PermissionType | null, status: NotificationStatus, priority: NotificationPriority, actionUrl?: string | null, expiresAt?: any | null, readAt?: any | null, metadata?: string | null }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type PermissionAssigneesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssigneeInfoFilterInput>;
}>;


export type PermissionAssigneesQuery = { __typename?: 'Query', permissionAssignees?: { __typename?: 'PermissionAssigneesCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'AssigneeInfo', id: any, name: string, type: GroupType, description?: string | null }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type PermissionListQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PermissionFilterInput>;
  order?: InputMaybe<Array<PermissionSortInput> | PermissionSortInput>;
}>;


export type PermissionListQuery = { __typename?: 'Query', permissions?: { __typename?: 'PermissionsCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Permission', id: any, name: string, _For?: PermissionType | null, allowed: Array<string> }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type GetPendingRequestsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RequestFilterInput>;
  order?: InputMaybe<Array<RequestSortInput> | RequestSortInput>;
}>;


export type GetPendingRequestsQuery = { __typename?: 'Query', pendingRequests?: { __typename?: 'PendingRequestsCollectionSegment', totalCount: number, items?: Array<{ __typename?: 'Request', id: any, fileId?: any | null, userId?: any | null, status: RequestStatus, description?: string | null, expiryDate?: any | null, submittedAt?: any | null, completedAt?: any | null, file?: { __typename?: 'File', pathName: string, name: string, parentId?: any | null, contentUrl: string, description?: string | null, size: any, mimeType: string, expiry?: any | null, id: any } | null, user?: { __typename?: 'User', id: any, name: string, email: string, roleId: any, departmentId?: any | null, managerId?: any | null } | null }> | null, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type GetRequestFlowQueryVariables = Exact<{
  where?: InputMaybe<WorkflowFilterInput>;
  order?: InputMaybe<Array<WorkflowSortInput> | WorkflowSortInput>;
}>;


export type GetRequestFlowQuery = { __typename?: 'Query', workflows: Array<{ __typename?: 'Workflow', id: any, name: string, description?: string | null, isSequential: boolean, requiredApprovals: number, timeoutHours?: number | null, allowDelegation: boolean, completionActionConfig?: string | null, rejectionActionConfig?: string | null, changesRequestedActionConfig?: string | null, cancelActionConfig?: string | null, steps: Array<{ __typename?: 'WorkflowStep', id: any, stepNumber: number, stepName: string, description?: string | null, status?: RequestStepStatus | null, assignedToId: any, isRequired: boolean, canDelegate: boolean, timeoutHours?: number | null, conditionExpression?: string | null, completionActionConfig?: string | null, rejectionActionConfig?: string | null }> }> };

export type GetRolesQueryVariables = Exact<{
  where?: InputMaybe<RoleFilterInput>;
  order?: InputMaybe<Array<RoleSortInput> | RoleSortInput>;
}>;


export type GetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: any, name: string, description: string }> };


export const CreateDepartmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDepartment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDepartmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDepartment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"parentDepartmentId"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}}]}}]}}]} as unknown as DocumentNode<CreateDepartmentMutation, CreateDepartmentMutationVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pathName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const UpdateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pathName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<UpdateFileMutation, UpdateFileMutationVariables>;
export const DeleteFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFileMutation, DeleteFileMutationVariables>;
export const RestoreFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RestoreFileMutation, RestoreFileMutationVariables>;
export const CreateFileVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFileVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFileVersionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFileVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"versionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFileVersionMutation, CreateFileVersionMutationVariables>;
export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const UpdateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const DeleteFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteFolderMutation, DeleteFolderMutationVariables>;
export const RestoreFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestoreFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RestoreFolderMutation, RestoreFolderMutationVariables>;
export const ProcessRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProcessRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestStepStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comments"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}}},{"kind":"Argument","name":{"kind":"Name","value":"action"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action"}}},{"kind":"Argument","name":{"kind":"Name","value":"comments"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comments"}}},{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"requestId"}},{"kind":"Field","name":{"kind":"Name","value":"stepNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"timeoutHours"}},{"kind":"Field","name":{"kind":"Name","value":"canDelegate"}},{"kind":"Field","name":{"kind":"Name","value":"delegatedToId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"actionAt"}},{"kind":"Field","name":{"kind":"Name","value":"actionComments"}}]}}]}}]}}]} as unknown as DocumentNode<ProcessRequestMutation, ProcessRequestMutationVariables>;
export const GetFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetFilesQuery, GetFilesQueryVariables>;
export const GetFileByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<GetFileByIdQuery, GetFileByIdQueryVariables>;
export const GetFilesByFolderIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilesByFolderId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filesByFolderId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"currentVersion"}}]}}]}}]} as unknown as DocumentNode<GetFilesByFolderIdQuery, GetFilesByFolderIdQueryVariables>;
export const GetFileVersionHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileVersionHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileVersionHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"versionNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFileVersionHistoryQuery, GetFileVersionHistoryQueryVariables>;
export const GetFoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetFoldersQuery, GetFoldersQueryVariables>;
export const GetFolderByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolderById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetFolderByIdQuery, GetFolderByIdQueryVariables>;
export const GetMyNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"relatedEntityId"}},{"kind":"Field","name":{"kind":"Name","value":"relatedEntityType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"actionUrl"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;
export const PermissionAssigneesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PermissionAssignees"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssigneeInfoFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionAssignees"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<PermissionAssigneesQuery, PermissionAssigneesQueryVariables>;
export const PermissionListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PermissionList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PermissionFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PermissionSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_For"}},{"kind":"Field","name":{"kind":"Name","value":"allowed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<PermissionListQuery, PermissionListQueryVariables>;
export const GetPendingRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPendingRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileId"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pathName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"contentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"expiry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"departmentId"}},{"kind":"Field","name":{"kind":"Name","value":"managerId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"expiryDate"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetPendingRequestsQuery, GetPendingRequestsQueryVariables>;
export const GetRequestFlowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRequestFlow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkflowFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkflowSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workflows"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isSequential"}},{"kind":"Field","name":{"kind":"Name","value":"requiredApprovals"}},{"kind":"Field","name":{"kind":"Name","value":"timeoutHours"}},{"kind":"Field","name":{"kind":"Name","value":"allowDelegation"}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stepNumber"}},{"kind":"Field","name":{"kind":"Name","value":"stepName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"isRequired"}},{"kind":"Field","name":{"kind":"Name","value":"canDelegate"}},{"kind":"Field","name":{"kind":"Name","value":"timeoutHours"}},{"kind":"Field","name":{"kind":"Name","value":"conditionExpression"}},{"kind":"Field","name":{"kind":"Name","value":"completionActionConfig"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionActionConfig"}}]}},{"kind":"Field","name":{"kind":"Name","value":"completionActionConfig"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionActionConfig"}},{"kind":"Field","name":{"kind":"Name","value":"changesRequestedActionConfig"}},{"kind":"Field","name":{"kind":"Name","value":"cancelActionConfig"}}]}}]}}]} as unknown as DocumentNode<GetRequestFlowQuery, GetRequestFlowQueryVariables>;
export const GetRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleSortInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetRolesQuery, GetRolesQueryVariables>;