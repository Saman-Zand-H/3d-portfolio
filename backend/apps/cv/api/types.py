import graphene
from graphene_django.types import DjangoObjectType
from .. import models


class LogoType(DjangoObjectType):
    class Meta:
        model = models.Logo
        fields = [
            model._meta.pk.name,
            model.file.field.name,
            model.alt.field.name,
            model.slug.field.name,
        ]


class SkillType(DjangoObjectType):
    logo = graphene.Field(LogoType)

    class Meta:
        model = models.Skill
        fields = [
            model._meta.pk.name,
            model.name.field.name,
            model.is_competency.field.name,
            model.logo.field.name,
            model.description.field.name,
        ]
        interfaces = (graphene.relay.Node,)


class PresentationTypeType(DjangoObjectType):
    class Meta:
        model = models.PresentationType
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]


class PresentationDcoumentType(DjangoObjectType):
    class Meta:
        model = models.PresentationDocument
        fields = [
            model._meta.pk.name,
            model.file.field.name,
            model.description.field.name,
        ]


class PresentationType(DjangoObjectType):
    documents = graphene.List(PresentationDcoumentType)
    presentation_type = graphene.Field(PresentationTypeType)

    class Meta:
        model = models.Presentation
        fields = [
            model._meta.pk.name,
            model.title.field.name,
            model.description.field.name,
            model.date.field.name,
            model.presentation_type.field.name,
            "documents",
        ]
        interfaces = (graphene.relay.Node,)


class PositionType(DjangoObjectType):
    class Meta:
        model = models.Position
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]


class CompanyType(DjangoObjectType):
    logo = graphene.Field(LogoType)
    
    class Meta:
        model = models.Company
        fields = [
            model._meta.pk.name,
            model.name.field.name,
            model.logo.field.name,
            model.website.field.name,
        ]


class WorkExperienceType(DjangoObjectType):
    position = graphene.Field(PositionType)
    company = graphene.Field(CompanyType)
    
    class Meta:
        model = models.WorkExperience
        fields = [
            model._meta.pk.name,
            model.position.field.name,
            model.company.field.name,
            model.cooperation_range.field.name,
            model.description.field.name,
        ]
        interfaces = (graphene.relay.Node,)
        

class ResearchTypeType(DjangoObjectType):
    class Meta:
        model = models.ResearchType
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]


class PublisherType(DjangoObjectType):
    logo = graphene.Field(LogoType)
    
    class Meta:
        model = models.Publisher
        fields = [
            model._meta.pk.name,
            model.name.field.name,
            model.logo.field.name,
            model.website.field.name,
        ]
        
        
class ResearchDocumentType(DjangoObjectType):
    class Meta:
        model = models.ResearchDocument
        fields = [
            model._meta.pk.name,
            model.file.field.name,
            model.description.field.name,
        ]
        
        
class ResearchType(DjangoObjectType):
    publisher = graphene.Field(PublisherType)
    research_type = graphene.Field(ResearchTypeType)
    documents = graphene.List(ResearchDocumentType)
    
    class Meta:
        model = models.ResearchExperience
        fields = [
            model._meta.pk.name,
            model.title.field.name,
            model.description.field.name,
            model.date.field.name,
            model.publisher.field.name,
            model.research_type.field.name,
            "documents",
        ]
        interfaces = (graphene.relay.Node,)
        
        
class CertificateType(DjangoObjectType):
    class Meta:
        model = models.Certificate
        fields = [
            model._meta.pk.name,
            model.title.field.name,
            model.description.field.name,
            model.file.field.name,
            model.date.field.name,
        ]
        interfaces = (graphene.relay.Node,)
        
        
class LanguageType(DjangoObjectType):
    class Meta:
        model = models.Language
        fields = [
            model._meta.pk.name,
            model.name.field.name,
            model.proficiency.field.name,
        ]
        interfaces = (graphene.relay.Node,)
        
        
class SettingKeyType(DjangoObjectType):
    class Meta:
        model = models.SettingKey
        fields = [
            model._meta.pk.name,
            model.key.field.name,
        ]
        
        
class SettingType(DjangoObjectType):
    class Meta:
        model = models.Setting
        fields = [
            model._meta.pk.name,
            model.key.field.name,
            model.value.field.name,
        ]
        interfaces = (graphene.relay.Node,)
        

class EducationType(DjangoObjectType):
    class Meta:
        model = models.Education
        fields = [
            model._meta.pk.name,
            model.major.field.name,
            model.degree.field.name,
            model.description.field.name,
            model.education_range.field.name,
        ]
        interfaces = (graphene.relay.Node,)
        
        
class ProjectTypeType(DjangoObjectType):
    class Meta:
        model = models.ProjectType
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]
        

class ProjectPropertyValueType(DjangoObjectType):
    class Meta:
        model = models.ProjectPropertyValue
        fields = [
            model._meta.pk.name,
            model.value.field.name,
            model.value.field.name,
        ]
        
        
class ProjectType(DjangoObjectType):
    project_type = graphene.Field(ProjectTypeType)
    properties = graphene.List(ProjectPropertyValueType)
    
    class Meta:
        model = models.Project
        fields = [
            model._meta.pk.name,
            model.title.field.name,
            model.description.field.name,
            model.project_range.field.name,
            model.project_type.field.name,
            "properties",
        ]
        interfaces = (graphene.relay.Node,)
