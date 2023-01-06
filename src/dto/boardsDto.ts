export interface GetBoardsWithCountsResponseDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly listsCount: number
  readonly tasksCount: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface GetBoardResponseDto {
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
      readonly tags: {
        readonly description: string
      }[]
    }[]
  }[]
}

export interface CreateBoardRequestDto {
  readonly title: string
  readonly description?: string
}

export interface CreateBoardResponseDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface UpdateBoardRequestDto {
  readonly title?: string
  readonly description?: string
}

export interface UpdateBoardResponseDto {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly updatedAt: Date
}
