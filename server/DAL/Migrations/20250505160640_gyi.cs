using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class gyi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubscriptionId",
                table: "SubscriptionCards",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Subscriptions",
                table: "SubscriptionCards",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubscriptionsId",
                table: "Subscription",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionCards_SubscriptionId",
                table: "SubscriptionCards",
                column: "SubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscription_SubscriptionsId",
                table: "Subscription",
                column: "SubscriptionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subscription_Subscription_SubscriptionsId",
                table: "Subscription",
                column: "SubscriptionsId",
                principalTable: "Subscription",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubscriptionCards_Subscription_SubscriptionId",
                table: "SubscriptionCards",
                column: "SubscriptionId",
                principalTable: "Subscription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscription_Subscription_SubscriptionsId",
                table: "Subscription");

            migrationBuilder.DropForeignKey(
                name: "FK_SubscriptionCards_Subscription_SubscriptionId",
                table: "SubscriptionCards");

            migrationBuilder.DropIndex(
                name: "IX_SubscriptionCards_SubscriptionId",
                table: "SubscriptionCards");

            migrationBuilder.DropIndex(
                name: "IX_Subscription_SubscriptionsId",
                table: "Subscription");

            migrationBuilder.DropColumn(
                name: "SubscriptionId",
                table: "SubscriptionCards");

            migrationBuilder.DropColumn(
                name: "Subscriptions",
                table: "SubscriptionCards");

            migrationBuilder.DropColumn(
                name: "SubscriptionsId",
                table: "Subscription");
        }
    }
}
