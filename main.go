package main

import (
	"fmt"
	"io"
	"net/http"
	"text/template"

	"github.com/labstack/echo/v4"
)

type Template struct {
	template *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.template.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()

	e.Static("/public", "public")

	t := &Template{
		template: template.Must(template.ParseGlob("views/*.html")),
	}

	e.Renderer = t

	e.GET("/", home)
	e.GET("/contact-form", contactForm)
	e.GET("/project-form", projectForm)
	e.POST("/project-add-form", projectAddForm)

	fmt.Println("Server Berlajalan di port 5000")
	e.Logger.Fatal(e.Start("localhost:5000"))
}

func home(c echo.Context) error {
	return c.Render(http.StatusOK, "index.html", nil)
}

func contactForm(c echo.Context) error {
	return c.Render(http.StatusOK, "contact-form.html", nil)
}

func projectForm(c echo.Context) error {
	return c.Render(http.StatusOK, "project-form.html", nil)
}

func projectAddForm(c echo.Context) error {
	projectName := c.FormValue("projectName")
	startDate := c.FormValue("startDate")
	endDate := c.FormValue("endDate")
	description := c.FormValue("description")
	techIcon := map[string]string{
		"nodeJs":     c.FormValue("nodeJsIco"),
		"nextJs":     c.FormValue("nextJsIco"),
		"reactJs":    c.FormValue("reactJsIco"),
		"typeScript": c.FormValue("typeScript"),
	}

	println("Project Name : " + projectName)
	println("Start Date : " + startDate)
	println("End Date : " + endDate)
	println("Description :" + description)
	// println("techIcon : " + techIcon["nodeJs"])
	// println("techIcon : " + techIcon["nextJs"])
	// println("techIcon : " + techIcon["reactJs"])
	// println("techIcon : " + techIcon["typeScript"])
	for k, v := range techIcon {
		fmt.Printf("%s: %s\n", k, v)
	}

	return c.Redirect(http.StatusMovedPermanently, "/")

}
