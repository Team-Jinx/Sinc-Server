export type AggregateResult<T> = {
  // where?: UserWhereInput
  // orderBy?: XOR<Enumerable<UserOrderByInput>, UserOrderByInput>
  // cursor?: UserWhereUniqueInput
  // take?: number
  // skip?: number
  // distinct?: Enumerable<UserDistinctFieldEnum>
  // _count?: true | UserCountAggregateInputType
  // _avg?: number | null
  _sum?: number;
  _min?: T;
  _max?: T;
};
