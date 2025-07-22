using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class ghj : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subscription_Subscription_SubscriptionsId",
                table: "Subscription");

            migrationBuilder.DropIndex(
                name: "IX_Subscription_SubscriptionsId",
                table: "Subscription");

            migrationBuilder.DropColumn(
                name: "SubscriptionsId",
                table: "Subscription");

            migrationBuilder.AlterColumn<int>(
                name: "Phone",
                table: "Subscription",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Subscription",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Phone",
                table: "Subscription",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Subscription",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubscriptionsId",
                table: "Subscription",
                type: "int",
                nullable: true);

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
        }
    }
}
