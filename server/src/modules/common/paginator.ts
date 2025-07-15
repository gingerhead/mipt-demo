import { Prisma } from '@prisma/client';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

type PaginateArgs = {
  where?: Prisma.VisitWhereInput | Prisma.PatientWhereInput;
  take?: number;
  skip?: number;
  cursor?: Prisma.VisitWhereUniqueInput | Prisma.PatientWhereUniqueInput;
  orderBy?:
    | Prisma.VisitOrderByWithRelationInput
    | Prisma.PatientOrderByWithRelationInput;
};

type PrismaModel<T> = Prisma.PatientDelegate & {
  count: (args: PaginateArgs) => Promise<number>;
  findMany: (args: PaginateArgs) => Promise<T[]>;
};

export type PaginateFunction<T> = (
  model: unknown,
  args?: PaginateArgs,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = <T>(
  defaultOptions: PaginateOptions,
): PaginateFunction<T> => {
  return async (
    model: unknown,
    args: PaginateArgs = {
      where: undefined,
    },
    options,
  ) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      (model as PrismaModel<T>).count({ where: args.where }),
      (model as PrismaModel<T>).findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);

    return {
      data,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};
