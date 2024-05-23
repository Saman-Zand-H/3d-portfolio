from . import types
import graphene
from graphene_django import DjangoConnectionField as DjangoFilterConnectionField 


class Query(graphene.ObjectType):
    skill = graphene.relay.Node.Field(types.SkillType)
    skills = DjangoFilterConnectionField(types.SkillType)
    
    presentation = graphene.relay.Node.Field(types.PresentationType)
    presentations = DjangoFilterConnectionField(types.PresentationType)
    
    work_experience = graphene.relay.Node.Field(types.WorkExperienceType)
    work_experiences = DjangoFilterConnectionField(types.WorkExperienceType)
    
    research = graphene.relay.Node.Field(types.ResearchType)
    researches = DjangoFilterConnectionField(types.ResearchType)    

    certificate = graphene.relay.Node.Field(types.CertificateType)
    certificates = DjangoFilterConnectionField(types.CertificateType)
    
    language = graphene.relay.Node.Field(types.LanguageType)
    languages = DjangoFilterConnectionField(types.LanguageType)
    
    setting = graphene.relay.Node.Field(types.SettingType)
    settings = DjangoFilterConnectionField(types.SettingType)
    
    education = graphene.relay.Node.Field(types.EducationType)
    educations = DjangoFilterConnectionField(types.EducationType)
    
    project = graphene.relay.Node.Field(types.ProjectType)
    projects = DjangoFilterConnectionField(types.ProjectType)
