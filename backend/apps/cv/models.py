from django.db import models
from django.utils.translation import gettext_lazy as _
from django_jalali.db.models import jDateField
from django.db.models import F
from django.db.models.functions import Concat
from django.contrib.postgres.fields import DateRangeField


class Logo(models.Model):
    alt = models.CharField(max_length=200, verbose_name=_("Alternative Text"))
    slug = models.SlugField(max_length=200, unique=True, verbose_name=_("Slug"))
    file = models.ImageField(upload_to="logos/", verbose_name=_("File"))

    @property
    def url(self):
        return self.file.url

    def __str__(self):
        return self.slug

    class Meta:
        verbose_name = _("Logo")
        verbose_name_plural = _("Logos")
        ordering = ["pk"]


class Skill(models.Model):
    name = models.CharField(max_length=200, verbose_name=_("Name"))
    logo = models.ForeignKey(
        Logo, on_delete=models.CASCADE, verbose_name=_("Logo"), related_name="skills"
    )
    is_competency = models.BooleanField(default=False, verbose_name=_("Is Competency"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Skill")
        verbose_name_plural = _("Skills")
        ordering = ["name"]


class PresentationType(models.Model):
    name = models.CharField(max_length=100, verbose_name=_("Name"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Presentation Type")
        verbose_name_plural = _("Presentation Types")
        ordering = ["name"]


class Presentation(models.Model):
    presentation_type = models.ForeignKey(
        PresentationType,
        on_delete=models.CASCADE,
        verbose_name=_("Presentation Type"),
        related_name="presentations",
    )
    title = models.CharField(max_length=200, unique=True, verbose_name=_("Title"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        verbose_name=_("Skills"),
        related_name="presentations",
    )
    date = jDateField(verbose_name=_("Date"))

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = _("Presentation")
        verbose_name_plural = _("Presentations")
        ordering = ["-date"]


class PresentationDocument(models.Model):
    presentation = models.ForeignKey(
        Presentation,
        on_delete=models.CASCADE,
        verbose_name=_("Presentation"),
        related_name="documents",
    )
    file = models.FileField(upload_to="presentations/", verbose_name=_("File"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))

    def __str__(self):
        return self.presentation.title

    class Meta:
        verbose_name = _("Presentation Document")
        verbose_name_plural = _("Presentation Documents")
        ordering = ["pk"]


class ContactWay(models.Model):
    title = models.CharField(max_length=100, verbose_name=_("Title"))
    logo = models.ForeignKey(
        Logo,
        on_delete=models.CASCADE,
        verbose_name=_("Logo"),
        related_name="contact_ways",
    )
    icon = models.CharField(max_length=100, verbose_name=_("Icon"))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Contact Way")
        verbose_name_plural = _("Contact Ways")
        ordering = ["title"]


class Person(models.Model):
    contact_ways = models.ManyToManyField(
        ContactWay,
        through="ContactInfo",
        blank=True,
        verbose_name=_("Contact Ways"),
        related_name="persons",
    )

    def __str__(self):
        return str(self.pk)

    class Meta:
        verbose_name = _("Person")
        verbose_name_plural = _("Persons")


class ContactInfo(models.Model):
    contact_way = models.ForeignKey(
        ContactWay,
        on_delete=models.CASCADE,
        verbose_name=_("Contact Way"),
        related_name="contact_infos",
    )
    person = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        verbose_name=_("Person"),
        related_name="contact_infos",
    )
    value = models.CharField(max_length=200, verbose_name=_("Value"))

    def __str__(self):
        return f"{self.person} - {self.contact_way}: {self.value}"

    class Meta:
        verbose_name = _("Contact Info")
        verbose_name_plural = _("Contact Infos")
        ordering = ["pk"]


class Collaborator(Person):
    class CollaboratorManager(models.Manager):
        def get_queryset(self):
            return (
                super()
                .get_queryset()
                .filter(
                    full_name=Concat(F("first_name"), models.Value(" "), F("last_name"))
                )
            )

    first_name = models.CharField(max_length=100, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=100, verbose_name=_("Last Name"))
    objects = CollaboratorManager()

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = _("Collaborator")
        verbose_name_plural = _("Collaborators")
        ordering = ["last_name", "first_name"]


class Company(Person):
    name = models.CharField(max_length=200, verbose_name=_("Name"))
    website = models.URLField(blank=True, null=True, verbose_name=_("Website"))
    logo = models.ForeignKey(
        Logo,
        on_delete=models.CASCADE,
        verbose_name=_("Logo"),
        related_name="companies",
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Company")
        verbose_name_plural = _("Companies")
        ordering = ["name"]


class Position(models.Model):
    name = models.CharField(max_length=100, verbose_name=_("Name"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Position")
        verbose_name_plural = _("Positions")
        ordering = ["name"]


class WorkExperience(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        verbose_name=_("Company"),
        related_name="work_experiences",
    )
    position = models.ForeignKey(
        Position,
        on_delete=models.CASCADE,
        verbose_name=_("Position"),
        related_name="work_experiences",
    )
    cooperation_range = DateRangeField(verbose_name=_("Cooperation Range"))
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        verbose_name=_("Skills"),
        related_name="work_experiences",
    )
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))

    @property
    def formatted_cooperation_range(self):
        return f"{self.cooperation_range.lower} - {self.cooperation_range.upper}"

    def __str__(self):
        return f"{self.formatted_cooperation_range} - {self.company} - {self.position}"

    class Meta:
        verbose_name = _("Work Experience")
        verbose_name_plural = _("Work Experiences")
        ordering = ["-cooperation_range"]


class Publisher(models.Model):
    name = models.CharField(max_length=200, verbose_name=_("Name"))
    logo = models.ForeignKey(
        Logo,
        on_delete=models.CASCADE,   
        verbose_name=_("Logo"),
        related_name="publishers",
        blank=True,
        null=True,
    )
    website = models.URLField(blank=True, null=True, verbose_name=_("Website"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Publisher")
        verbose_name_plural = _("Publishers")
        ordering = ["name"]


class ResearchType(models.Model):
    name = models.CharField(max_length=100, verbose_name=_("Name"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Research Type")
        verbose_name_plural = _("Research Types")
        ordering = ["name"]


class ResearchExperience(models.Model):
    publisher = models.ForeignKey(
        Publisher,
        on_delete=models.CASCADE,
        verbose_name=_("Publisher"),
        related_name="research_experiences",
    )
    research_type = models.ForeignKey(
        ResearchType,
        on_delete=models.CASCADE,
        verbose_name=_("Research Type"),
        related_name="research_experiences",
    )
    title = models.CharField(max_length=200, verbose_name=_("Title"))
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        verbose_name=_("Skills"),
        related_name="research_experiences",
    )
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))
    date = jDateField(verbose_name=_("Date"))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Research Experience")
        verbose_name_plural = _("Research Experiences")
        ordering = ["-date"]


class ResearchDocument(models.Model):
    research_experience = models.ForeignKey(
        ResearchExperience,
        on_delete=models.CASCADE,
        verbose_name=_("Research Experience"),
        related_name="documents",
    )
    file = models.FileField(upload_to="researches/", verbose_name=_("File"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))

    def __str__(self):
        return self.research_experience.title

    class Meta:
        verbose_name = _("Research Document")
        verbose_name_plural = _("Research Documents")
        ordering = ["pk"]


class Certificate(models.Model):
    title = models.CharField(max_length=200, verbose_name=_("Title"))
    file = models.FileField(upload_to="certificates/", verbose_name=_("File"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        verbose_name=_("Skills"),
        related_name="certificates",
    )
    date = jDateField(verbose_name=_("Date"))

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Certificate")
        verbose_name_plural = _("Certificates")
        ordering = ["-date"]


class Honor(models.Model):
    title = models.CharField(max_length=200, verbose_name=_("Title"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))
    date = jDateField(verbose_name=_("Date"))
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        verbose_name=_("Skills"),
        related_name="honors",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Honor")
        verbose_name_plural = _("Honors")
        ordering = ["-date"]


class Language(models.Model):
    class Proficiency(models.TextChoices):
        BASIC = "basic", _("Basic")
        INTERMEDIATE = "intermediate", _("Intermediate")
        ADVANCED = "advanced", _("Advanced")
        NATIVE = "native", _("Native")
        A1 = "a1", _("A1")
        A2 = "a2", _("A2")
        B1 = "b1", _("B1")
        B2 = "b2", _("B2")
        C1 = "c1", _("C1")
        C2 = "c2", _("C2")

    name = models.CharField(max_length=100, unique=True, verbose_name=_("Name"))
    proficiency = models.CharField(
        max_length=50,
        choices=Proficiency.choices,
        default=Proficiency.BASIC,
        verbose_name=_("Proficiency"),
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Language")
        verbose_name_plural = _("Languages")
        ordering = ["name"]


class SettingKey(models.Model):
    key = models.CharField(max_length=100, unique=True, verbose_name=_("Key"))

    def __str__(self):
        return self.key

    class Meta:
        verbose_name = _("Setting Key")
        verbose_name_plural = _("Setting Keys")
        ordering = ["key"]


class Setting(models.Model):
    key = models.ForeignKey(SettingKey, on_delete=models.CASCADE, verbose_name=_("Key"))
    value = models.TextField(verbose_name=_("Value"))

    def __str__(self):
        return f"{self.key} - {self.value}"

    class Meta:
        verbose_name = _("Setting")
        verbose_name_plural = _("Settings")
        ordering = ["key"]


class Education(models.Model):
    class Degree(models.TextChoices):
        ASSOCIATE = "associate", _("Associate")
        BACHELOR = "bachelor", _("Bachelor")
        MASTER = "master", _("Master")
        DOCTORATE = "doctorate", _("Doctorate")

    degree = models.CharField(
        max_length=50,
        choices=Degree.choices,
        default=Degree.BACHELOR,
        verbose_name=_("Degree"),
    )
    major = models.CharField(max_length=200, verbose_name=_("Major"))
    university = models.CharField(max_length=200, verbose_name=_("University"))
    education_range = DateRangeField(verbose_name=_("Education Range"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))

    @property
    def formatted_education_range(self):
        return f"{self.education_range.lower} - {self.education_range.upper}"

    def __str__(self):
        return f"{self.degree} - {self.major} - {self.university}"

    class Meta:
        verbose_name = _("Education")
        verbose_name_plural = _("Educations")
        ordering = ["-education_range"]


class ProjectType(models.Model):
    name = models.CharField(max_length=100, verbose_name=_("Name"))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Project Type")
        verbose_name_plural = _("Project Types")
        ordering = ["name"]


class ProjectProperty(models.Model):
    key = models.CharField(max_length=100, verbose_name=_("Key"))

    def __str__(self):
        return self.key

    class Meta:
        verbose_name = _("Project Property")
        verbose_name_plural = _("Project Properties")
        ordering = ["key"]


class Project(models.Model):
    project_type = models.ForeignKey(
        ProjectType,
        on_delete=models.CASCADE,
        verbose_name=_("Project Type"),
        related_name="projects",
    )
    title = models.CharField(max_length=200, verbose_name=_("Title"))
    description = models.TextField(blank=True, null=True, verbose_name=_("Description"))
    properties = models.ManyToManyField(
        ProjectProperty,
        through="ProjectPropertyValue",
        blank=True,
        verbose_name=_("Properties"),
        related_name="projects",
    )
    project_range = DateRangeField(verbose_name=_("Project Range"))
    skills = models.ManyToManyField(
        Skill,
        blank=True,
        verbose_name=_("Skills"),
        related_name="projects",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")
        ordering = ["-project_range"]


class ProjectPropertyValue(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name=_("Project"),
        related_name="property_values",
    )
    property = models.ForeignKey(
        ProjectProperty,
        on_delete=models.CASCADE,
        verbose_name=_("Property"),
        related_name="property_values",
    )
    value = models.CharField(max_length=200, verbose_name=_("Value"))

    def __str__(self):
        return f"{self.project} - {self.property}: {self.value}"

    class Meta:
        verbose_name = _("Project Property Value")
        verbose_name_plural = _("Project Property Values")
        ordering = ["pk"]
