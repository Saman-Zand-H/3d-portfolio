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
        filter_fields = {
            "slug": ["iexact"],
        }


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
        filter_fields = {
            "name": ["exact", "icontains"],
            "is_competency": ["exact"],
        }
        interfaces = (graphene.relay.Node,)


class PresentationTypeType(DjangoObjectType):
    class Meta:
        model = models.PresentationType
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]
        filter_fields = {
            model.name.field.name: ["exact", "icontains"],
        }


class PresentationDcoumentType(DjangoObjectType):
    class Meta:
        model = models.PresentationDocument
        fields = [
            model._meta.pk.name,
            model.file.field.name,
            model.description.field.name,
        ]
        filter_fields = {
            "description": ["exact", "icontains"],
        }


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
        filter_fields = {
            "title": ["exact", "icontains"],
            "description": ["exact", "icontains"],
            "date": ["exact", "icontains"],
            "presentation_type": ["exact"],
        }
        interfaces = (graphene.relay.Node,)


class PositionType(DjangoObjectType):
    class Meta:
        model = models.Position
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]
        filter_fields = {
            "name": ["exact", "icontains"],
        }


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
        filter_fields = {
            "name": ["exact", "icontains"],
            "website": ["exact", "icontains"],
        }


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
        filter_fields = {
            "position": ["exact"],
            "company": ["exact"],
            "description": ["exact", "icontains"],
        }
        interfaces = (graphene.relay.Node,)
        

class ResearchTypeType(DjangoObjectType):
    class Meta:
        model = models.ResearchType
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]
        filter_fields = {
            "name": ["exact", "icontains"],
        }


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
        filter_fields = {
            "name": ["exact", "icontains"],
            "website": ["exact", "icontains"],
        }
        
        
class ResearchDocumentType(DjangoObjectType):
    class Meta:
        model = models.ResearchDocument
        fields = [
            model._meta.pk.name,
            model.file.field.name,
            model.description.field.name,
        ]
        filter_fields = {
            "description": ["exact", "icontains"],
        }
        
        
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
        filter_fields = {
            "title": ["exact", "icontains"],
            "description": ["exact", "icontains"],
            "date": ["exact", "icontains"],
            "publisher": ["exact"],
            "research_type": ["exact"],
        }
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
        filter_fields = {
            "title": ["exact", "icontains"],
            "description": ["exact", "icontains"],
            "date": ["exact", "icontains"],
        }
        interfaces = (graphene.relay.Node,)
        
        
class LanguageType(DjangoObjectType):
    class Meta:
        model = models.Language
        fields = [
            model._meta.pk.name,
            model.name.field.name,
            model.proficiency.field.name,
        ]
        filter_fields = {
            "name": ["exact", "icontains"],
            "proficiency": ["exact"],
        }
        interfaces = (graphene.relay.Node,)
        
        
class SettingKeyType(DjangoObjectType):
    class Meta:
        model = models.SettingKey
        fields = [
            model._meta.pk.name,
            model.key.field.name,
        ]
        filter_fields = {
            "key": ["exact", "icontains"],
        }
        
        
class SettingType(DjangoObjectType):
    class Meta:
        model = models.FileSetting
        fields = [
            model._meta.pk.name,
            model.key.field.name,
            model.value.field.name,
        ]
        filter_fields = {
            "key": ["exact"],
        }
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
        filter_fields = {
            "major": ["exact", "icontains"],
            "degree": ["exact", "icontains"],
            "description": ["exact", "icontains"],
        }
        interfaces = (graphene.relay.Node,)
        
        
class ProjectTypeType(DjangoObjectType):
    class Meta:
        model = models.ProjectType
        fields = [
            model._meta.pk.name,
            model.name.field.name,
        ]
        filter_fields = {
            "name": ["exact", "icontains"],
        }
        

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
        filter_fields = {
            "title": ["exact", "icontains"],
            "description": ["exact", "icontains"],
            "project_type": ["exact"],
        }
        interfaces = (graphene.relay.Node,)
