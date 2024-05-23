import graphene

from cv.api.query import Query as CVQuery


class Query(CVQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
