export interface GetBoardCountDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly listsCount: number
  readonly tasksCount: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface GetBoardDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly lists: {
    readonly id: number
    readonly title: string
    readonly description: string
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly tasks: {
      readonly id: number
      readonly title: string
      readonly description: string
      readonly createdAt: Date
      readonly updatedAt: Date
    }[]
  }[]
}

export interface CreateBoardDto {
  readonly title: string
  readonly description?: string
}

export interface CreatedBoardDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface UpdateBoardDto {
  readonly title?: string
  readonly description?: string
}

export interface UpdatedBoardDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly updatedAt: Date
}
