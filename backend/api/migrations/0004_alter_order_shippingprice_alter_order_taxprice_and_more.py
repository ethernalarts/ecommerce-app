# Generated by Django 4.2.6 on 2023-10-11 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shippingPrice',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='taxPrice',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='totalPrice',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='price',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='shippingaddress',
            name='shippingPrice',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
